import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("dateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>(
    "mailProvider",
    new EtherealMailProvider()
);
