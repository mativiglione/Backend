import winston from 'winston';

const customLevels = {
  levels: {// Tenias el orden de los numeros al reves. Ej, si pongo el level debug va a logear todos, desde el 5 al 0. En error logea del 1 al 0
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {//Declaramos un color para cada level
    fatal: "magenta",
    error: "red",
    waning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};
winston.addColors(customLevels.colors);

export const logger = winston.createLogger({
  levels: customLevels.levels,

  transports: [//Cada transport se encarga de manejar errores de distinto nivel. El primero los muestra por consola, en nivel debug(o sea todos)
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(//Aca le da un formato y le aplica color.
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({//Este transport va a guardar en el archivo solo a partir del nivel error
      filename: "./errors.log",
      level: "error",
    }),
  ],
});
