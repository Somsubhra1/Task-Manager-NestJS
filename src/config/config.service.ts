import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { join } from "path";
config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("NODE_ENV", false);
    return mode != "development";
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.getValue("DATABASE_HOST"),
      port: parseInt(this.getValue("DATABASE_PORT")),
      username: this.getValue("DATABASE_USER"),
      password: this.getValue("DATABASE_PASSWORD"),
      database: this.getValue("DATABASE_NAME"),

      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      autoLoadEntities: true,
      synchronize: true,

      migrationsTableName: "migration",

      // migrations: ["src/migration/*.ts"],

      cli: {
        migrationsDir: "src/migration",
      },

      ssl: this.isProduction(),
    };
  }
  public getJwtConfig() {
    return {
      secret: this.getValue("JWT_SECRET"),
      signOptions: {
        expiresIn: 3600,
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "DATABASE_TYPE",
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_USER",
  "DATABASE_PASSWORD",
  "DATABASE_NAME",
  "JWT_SECRET",
]);

export { configService };
