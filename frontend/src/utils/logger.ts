const isDev = process.env.NODE_ENV === "development";

type LogLevel = "info" | "warn" | "error";

const log = (level: LogLevel, ...out: unknown[]) => {
  if (!isDev && level === "info") return;

  console[level](out);
};

export default log;
