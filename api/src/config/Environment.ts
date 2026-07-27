import { EnvironmentSchema } from "./schema";

const parsed = EnvironmentSchema.safeParse(process.env);

if (!parsed.success) {

    throw new Error(
        parsed.error.issues
            .map(issue => issue.path.join(".") + ": " + issue.message)
            .join("\n")
    );

}

export const Environment = parsed.data;