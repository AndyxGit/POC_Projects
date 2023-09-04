        package lippia.model.api.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

        @AllArgsConstructor
        @Builder
        @Setter
        @Getter
        public class RegistroLogModel {
            private String tag;
            private String nameScenario;
            private String pass;
            private String fail;
        }
