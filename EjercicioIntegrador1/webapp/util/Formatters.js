// jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([],
    function () {
        "use strict";

        return {
            
            //formatter del estado del peso (menor a 1 kilo/menor a 2 kilos /else, que seria cualquiera mayor a 2kg)
            formatPesoState: function (fMeasure, sUnit) {

                var fMaxWeightSuccess = 1;
                var fMaxWeightWarning = 2;
                var fAdjustedMeasure = parseFloat(fMeasure);

                if (isNaN(fAdjustedMeasure)) {
                    return "None";
                } else {

                    if (fAdjustedMeasure < 0) {
                        return "None";
                    } else if (fAdjustedMeasure < fMaxWeightSuccess) {
                        return "Success";
                    } else if (fAdjustedMeasure < fMaxWeightWarning) {
                        return "Warning";
                    } else {
                        return "Error";
                    }
                }
            },

            //formatter del valor que lo pasa de pesos a euros
            formatValor: function(nValor) {

                let nPrecio = nValor / 160;

                return nPrecio;

            }


        };
    }, true);