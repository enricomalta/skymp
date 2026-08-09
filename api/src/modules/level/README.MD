# Terras Além --- Level System

## Objetivo

O `LevelSystem` é um módulo independente responsável exclusivamente pela
progressão de nível dos personagens.

Ele não conhece e não depende de:

-   PvP
-   PK
-   Guerra
-   Red Skull
-   Inventário
-   Honra
-   Drop de itens

A função dele é fornecer uma API de negócio que outros módulos podem
consumir quando precisarem alterar a experiência ou aplicar uma
penalidade.

------------------------------------------------------------------------

## Estrutura

``` text
src/modules/level/
├── LevelModule.ts
├── LevelService.ts
├── LevelCalculator.ts
└── types/
    └── LevelTypes.ts
```

### LevelModule

É a integração do sistema com a Foundation da API.

Implementa:

``` ts
interface Module {
    readonly name: string;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
}
```

O `LevelModule` instancia o `LevelService` e disponibiliza o serviço
para os demais sistemas.

------------------------------------------------------------------------

## LevelCalculator

É responsável somente pela matemática da progressão.

Ele calcula:

-   XP necessária para o próximo nível;
-   XP total necessária para atingir determinado nível;
-   nível correspondente a uma quantidade de XP;
-   progresso dentro do nível;
-   XP restante até o próximo nível.

A XP do personagem é tratada como **XP total acumulada**.

Exemplo conceitual:

``` text
Level 1 → 0 XP
Level 2 → XP acumulada necessária
Level 3 → XP acumulada necessária
Level 4 → XP acumulada necessária
...
```

A fórmula atual é apenas uma configuração inicial:

``` text
BASE_EXPERIENCE = 100
GROWTH_RATE = 1.15
```

Esses valores deverão ser testados e balanceados posteriormente.

------------------------------------------------------------------------

## LevelService

É a camada de negócio do sistema.

Responsabilidades atuais:

### Ganhar XP

``` ts
addExperience(characterId, amount)
```

Fluxo:

``` text
characterId
    ↓
CharacterRepository
    ↓
carrega Character
    ↓
adiciona XP
    ↓
LevelCalculator
    ↓
calcula novo Level
    ↓
CharacterRepository.save()
    ↓
MongoDB
```

O método retorna informações como:

-   level anterior;
-   level atual;
-   XP anterior;
-   XP atual;
-   XP recebida;
-   quantidade de levels ganhos.

------------------------------------------------------------------------

### Perder XP

``` ts
removeExperience(characterId, amount)
```

O método:

1.  carrega o personagem;
2.  remove a XP;
3.  impede XP negativa;
4.  recalcula o level;
5.  identifica quantos levels foram perdidos;
6.  salva o personagem.

Isso permite que uma penalidade de morte provoque Level Down
automaticamente.

------------------------------------------------------------------------

### Penalidade de morte

``` ts
applyDeathPenalty(
    characterId,
    {
        experienceLossPercent: 5
    }
)
```

O LevelSystem não sabe por que o jogador morreu.

Ele apenas recebe uma penalidade.

Por exemplo:

``` text
5% de XP
10% de XP
15% de XP
```

Quem decidirá qual penalidade deve ser aplicada será o sistema
responsável pela morte.

Isso é importante porque o PvP poderá possuir regras diferentes para:

-   PvP normal;
-   PK;
-   Red Skull;
-   Guerra.

O LevelSystem não precisa conhecer nenhuma dessas regras.

------------------------------------------------------------------------

## CharacterRepository

O LevelSystem utiliza o `CharacterRepository` existente.

Não existe um `LevelRepository` separado.

O personagem já possui:

``` ts
level: number;
experience: number;
```

Portanto o MongoDB continua tendo uma única fonte de verdade para esses
dados.

O fluxo é:

``` text
LevelService
    ↓
CharacterRepository
    ↓
CharacterModel
    ↓
MongoDB
```

------------------------------------------------------------------------

# Relação futura com o PvP

O PvP será desenvolvido em outro módulo.

A dependência será:

``` text
PvPSystem
    ↓
morte
    ↓
DeathPenalty
    ↓
LevelService
    ↓
perda de XP
    ↓
Level Down, se necessário
```

O LevelSystem não deverá importar o PvPSystem.

A direção da dependência é:

``` text
PvP → Level
```

e não:

``` text
Level → PvP
```

Isso mantém os módulos independentes.

------------------------------------------------------------------------

# Próxima etapa: PvP System

O PvP será responsável por determinar a natureza da morte.

Exemplos:

``` text
Jogador branco atacou jogador branco
    ↓
PK
```

``` text
Jogador roxo atacou jogador roxo
    ↓
PvP
```

``` text
Jogador atacou PK
    ↓
sem penalidade de PK para o atacante
```

``` text
Jogador contra inimigo de guerra
    ↓
Guerra
```

O PvP determinará as consequências e então chamará os sistemas
responsáveis.

------------------------------------------------------------------------

# Morte e Inventário

A morte não será responsabilidade exclusiva do LevelSystem.

Uma morte poderá gerar várias consequências:

``` text
Player Death
    │
    ├── LevelSystem
    │      └── perda de XP
    │
    ├── InventorySystem
    │      └── drop de itens
    │
    ├── HonorSystem
    │      └── alteração de honra
    │
    └── PvPSystem
           └── regras de PK/PvP/Guerra
```

Por isso o PvP não deve manipular diretamente a estrutura interna do
inventário.

Ele deverá chamar o módulo de inventário quando chegar a hora de
calcular e executar o drop.

------------------------------------------------------------------------

# Dependência com o InventorySystem

Como o InventorySystem ainda não foi finalizado, o PvP deverá ser
preparado para consumi-lo sem criar uma implementação falsa do
inventário.

A ideia será:

``` text
PvP Death
    ↓
DeathPenalty / DeathService
    ├── LevelService
    │      └── XP Loss
    │
    └── InventoryService
           └── Item Drop
```

O `DeathService` será o ponto de coordenação das consequências da morte.

Ele não deverá duplicar a lógica interna de XP ou inventário.

------------------------------------------------------------------------

# Testes do LevelSystem

Antes de considerar a progressão definitivamente balanceada, testar:

## Níveis baixos

Verificar:

-   XP necessária do Level 1 → 2;
-   XP necessária do Level 2 → 3;
-   XP necessária do Level 3 → 4;
-   ganho normal de XP;
-   Level Up.

## Níveis médios

Testar:

-   progressão crescente;
-   ganho grande de XP;
-   vários Level Ups em uma única operação;
-   perda de XP sem Level Down;
-   perda de XP com Level Down.

## Níveis altos

Testar:

-   valores grandes de XP;
-   tempo necessário para progressão;
-   crescimento da curva;
-   possibilidade de números excessivamente grandes;
-   desempenho do cálculo.

## Morte

Testar:

``` text
5% de perda
10% de perda
15% de perda
0% de perda
100% de perda
```

Também testar:

``` text
XP suficiente para permanecer no mesmo level
XP suficiente para perder 1 level
XP suficiente para perder vários levels
XP chegando a 0
```

------------------------------------------------------------------------

# Critério para congelar o LevelSystem

O sistema poderá ser considerado fechado quando:

-   XP estiver sendo persistida corretamente;
-   Level estiver sendo persistido corretamente;
-   Level Up funcionar;
-   Level Down funcionar;
-   XP nunca ficar negativa;
-   a fórmula de progressão estiver validada;
-   penalidade de morte funcionar;
-   o sistema puder ser chamado por outro módulo;
-   não existir dependência do PvP;
-   não existir dependência do InventorySystem.

Depois disso, o PvP poderá consumir o LevelSystem como uma dependência
externa.

------------------------------------------------------------------------

# Arquitetura final esperada

``` text
                    API
                     │
        ┌────────────┼─────────────┐
        │            │             │
   LevelSystem   PvPSystem   InventorySystem
        │            │             │
        │            │             │
        │       DeathService       │
        │            │             │
        └────────────┼─────────────┘
                     │
                Character
                     │
                  MongoDB
```

O princípio principal é:

> Cada módulo é responsável pela própria regra de negócio e não deve
> implementar internamente a regra de outro módulo.

Assim, uma morte pode chamar vários sistemas sem transformar o PvP em um
módulo gigante que controla XP, inventário, honra e todas as outras
mecânicas diretamente.
