import pandas as pd
import qrcode as qr

## trae el libro como variable ##
excel = "generador qr\books.xlsx"
#### lee el libro ####
dtf1 = pd.read_excel(excel)
## se inicializa un contador y se comienza un bucle por cada entrada del dataframe ##
## extraido del libro ##

for i in range(len(dtf1)):
    x = dtf1.at[i,'title']
    qr_code = qr.QRCode(
        version=None,
        error_correction=qr.constants.ERROR_CORRECT_Q,
    )
    qr_code.add_data(x)
    qr_code.make(fit=True)

    img = qr_code.make_image(fill_color="black", back_color="white")
    # Genera el nombre del archivo proceduralmente usando el índice
    filename = f'libro_{i+1}.png'
    img.save(filename)
    print(f"Código QR para '{x}' guardado como '{filename}'")

print ("Proceso de generación de códigos QR completado.")