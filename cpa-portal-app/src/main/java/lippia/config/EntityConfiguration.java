package lippia.config;

import lippia.services.api.dataConsumption.DataConsumptionService;
import lippia.services.api.line_check.LineCheckService;

public enum EntityConfiguration {

    LINE_CHECK {
        @Override
        public Class<?> getEntityService() {
            return LineCheckService.class;
        }
    },
    DATA_CONSUMPTION {
        @Override
        public Class<?> getEntityService() {
            return DataConsumptionService.class;
        }
    };

    public abstract Class<?> getEntityService();
}
