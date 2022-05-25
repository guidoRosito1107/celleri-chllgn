## Inicialización

1. Instalar las dependencias y realizar actualizaciones necesarias.

```bash
npm install
```

2. Inicializar.
```bash
npm start
```

## Estructura de Carpetas

 1. src.
    --> components (expone los componetes usados en toda la aplicación)
        --> CustomButton
        --> CustomCheckbox 
        --> CustomInput (2 inputs custom - Debido a la existencias de dos estilos diferentes para distinas situaciones)
        --> CustomRadio 
        --> CustomSelect
        --> Forms (contiene los distintos steps y componentes involucrados en los mismos que serán cargados mediante react-router-dom)
            --> <BankDataForm>
            --> <CameraSection>
            --> <DocumentUploadForm>
            --> <EndSection>
            --> <FinishPersonalData>
            --> <InitialDataForm>
            --> <LegalData>
            --> <PersonalDataAddressForm>
            --> <PersonalDataForm>
            --> <SelfieSection>
            --> <Start>
            --> <StartProofOfLife>
            --> <StartStyles>
        --> Logo
    --> utils
        --> APIResources (CONTIENE LOS RECURSOS QUE INVOLUCREN A LA API DE AFIP)
        --> DataTypes (CONTIENE LOS TIPOS DE DATOS DISEÑADOS PARA TRABAJAR CON LOS FORMS)
        --> functions (CONTIENE LAS FUNCIONES COMUNES QUE SON UTILIZADAS A LO LARGO DE TODO EL PROYECTO)
        --> icons (CONTIENE LOS ICONOS UTILIZADOS A LO LARGO DE TODO EL PROYECTO)
        --> ValidationResources (CONTIENE LOS RECURSOS UTILIZADOS PARA LA REALIZACIÓN DE VALIDACIONES)
    --> commonStyles