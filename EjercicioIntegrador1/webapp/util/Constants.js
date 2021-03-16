sap.ui.define([],
    function () {
        "use strict";

        return {
            models: {
                MODEL_PRODUCTS: {
                    name: "modeloProductos",
                    properties: {
                        producto: "producto",
                        proveedor: "proveedor",
                        tamaño: "tamaño",
                        peso: "peso",
                        unidadPeso: "unidadPeso",
                        valor: "valor"
                    }
                },
                MODEL_SEARCH: {
                    name: "modeloSearch"
                },
                FILTERS: {
                    name: "Filtros"
                }
            },

            ids: {
                FRAGMENTS: {
                    table: "idProductsTable",
                    dialog: "iidDialogInputs"
                }
            },

            routes: {
                JSON: {
                    products: "Products.json",
                    search: "Search.json"
                },
                FRAGMENTS: {
                    table: "EjercicioIntegrador1.EjercicioIntegrador1.fragments.Table",
                    dialog: "EjercicioIntegrador1.EjercicioIntegrador1.fragments.Dialog_inputs"
                }
            }
        };
    }, true);