sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "EjercicioIntegrador1/EjercicioIntegrador1/util/Services",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "EjercicioIntegrador1/EjercicioIntegrador1/util/Constants",
    "EjercicioIntegrador1/EjercicioIntegrador1/util/Formatters"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */gmail.lc


    function (Controller, JSONModel, Services, Filter, FilterOperator, Fragment, Constants, Formatters) {
        "use strict";

        return Controller.extend("EjercicioIntegrador1.EjercicioIntegrador1.controller.Main", {
            Formatter: Formatters,
            onInit: function () {
                //Carga el modelo de search primero para que pueda guardar los datos ingresados
                this.loadModel2();
            },

            //Funcion que crea y abre el dialogo
            onPress: function (oEvent) {

                var oView = this.getView();

                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId(),
                        name: Constants.routes.FRAGMENTS.dialog,
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                };

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                }.bind(this));
                
                //y a la vez carga el modelo de productos, que tambien podria hacerse en la funcion onClose
                this.loadModel();

            },

            //Funcion que cierra el dialogo (no de la forma mas limpia, pero me rompia por alguna razon y trate de resolverlo accediendo desde el evento)
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            },

            //evento que se dispara con cada cambio en los caracteres de la busqueda. dispara los filtros
            onSearch: function (oEvent) {

                //se declara el array que va a almacenar todos los filtros y la variable query que almacena el string de la busqueda
                let aFiltros = [];
                let sQuery = oEvent.getSource().getValue();

                //si la query tiene algun valor con mas de cero caracteres se ejecutan los filtros y se van pusheando dentro del array de a uno.
                if (sQuery && sQuery.length > 0) {

                    let oFiltroProducto = new Filter(Constants.models.MODEL_PRODUCTS.properties.producto, FilterOperator.Contains, sQuery);
                    aFiltros.push(oFiltroProducto);

                    let oFiltroProveedor = new Filter(Constants.models.MODEL_PRODUCTS.properties.proveedor, FilterOperator.Contains, sQuery);
                    aFiltros.push(oFiltroProveedor);

                    //se guarda el array en un objeto, por lo que entendi, para que itere sobre los filtros de a uno y no filtre por los dos a la vez.
                    var oFiltros = new Filter(aFiltros);
                }

                //aca se le bindean los filtros a la tabla y sus items. se que deberia haber accedido a la tabla de una forma mas limpia, pero no me quedaba mucho tiempo y me tiraba error (creo que por estar en un fragmento y no el main view rompe)
                let oTabla = oEvent.getSource().getParent().getParent();
                let oBindingInfo = oTabla.getBinding("items");
                oBindingInfo.filter(oFiltros, Constants.models.FILTERS.name);

            },

            //esta funcion deberia abrir un dialog al clickear en un item de la tabla, y mostrar un simple form con los datos de cada producto del modelo.
            // onOpenInfoDialog: function (oEvent) {
            //     var oItem = oEvent.getSource();

            //     var oBindingContext = oItem.getBindingContext(Constants.models.MODEL_PRODUCTS.name);

            //     var oModel = this.getView().getModel(Constants.models.MODEL_PRODUCTS.name);

            //     var oProductoSeleccionado = oModel.getProperty(oBindingContext.getPath());
            // },

            //Cargar modelo con datos del json con productos.
            loadModel: async function () {

                const oResponseProducts = await Services.getLocalJSON(Constants.routes.JSON.products);

                const oDataProducts = oResponseProducts[0];

                var oModelProducts = new JSONModel();
                oModelProducts.setData(oDataProducts);

                this.getView().setModel(oModelProducts, Constants.models.MODEL_PRODUCTS.name);
            },


            //Cargar modelo con datos del json que cree para guardar los datos de fecha, proveedor seleccionado y pais ingresado.
            loadModel2: async function () {

                const oResponseSearch = await Services.getLocalJSON(Constants.routes.JSON.search);

                const oDataSearch = oResponseSearch[0];

                var oModelSearch = new JSONModel();
                oModelSearch.setData(oDataSearch);

                this.getView().setModel(oModelSearch, Constants.models.MODEL_SEARCH.name);
            }
        });
    });