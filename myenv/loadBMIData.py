import requests
import bmiZTupla as bmi
import firebase

def carga_bmi_z_5_19(gender, url):
    print('buscando dados de BMI for Age 5-19...')
    urlBMIZ_5_19 = url
    bmiZ = requests.get(urlBMIZ_5_19)

    if (bmiZ.status_code == 200):
        bmiZTXT = bmiZ.text
        bmiZArray = bmiZTXT.split()
    
        bmiZArraySkipped = bmiZArray[13:]
        #print(bmiGirlsZArraySkipped)

        cont = 0
        qtdWords = int(len(bmiZArraySkipped)/13)
        print(qtdWords)
        for x in range (0, qtdWords):
            tupla = bmi.BMIZTupla(gender, bmiZArraySkipped[cont], 
                bmiZArraySkipped[cont + 1], bmiZArraySkipped[cont + 2], 
                bmiZArraySkipped[cont + 3], bmiZArraySkipped[cont + 4], 
                bmiZArraySkipped[cont + 5], bmiZArraySkipped[cont + 6], 
                bmiZArraySkipped[cont + 7], bmiZArraySkipped[cont + 8], 
                bmiZArraySkipped[cont + 9], bmiZArraySkipped[cont + 10], 
                bmiZArraySkipped[cont + 11], bmiZArraySkipped[cont + 12])
            cont = cont + 13
            print('inserindo no banco a tupla '+tupla.month+'...')
            # insere no banco
            key = tupla.gender+''+tupla.month
            doc_ref = firebase.db.collection('bmiForAge').document(key)
            doc_ref.set({
                u'month': int(tupla.month),
                u'gender': tupla.gender,
                #u'L': tupla.L,
                #u'M': tupla.M,
                #u'S': tupla.S,
                u'SD4neg': float(tupla.SD4neg),
                u'SD3neg': float(tupla.SD3neg),
                u'SD2neg': float(tupla.SD2neg),
                u'SD1neg': float(tupla.SD1neg),
                u'SD0': float(tupla.SD0),
                u'SD1': float(tupla.SD1),
                u'SD2': float(tupla.SD2),
                u'SD3': float(tupla.SD3),
                u'SD4': float(tupla.SD4)
            })

    
    print('finalizando a carga...')

carga_bmi_z_5_19('g', 'http://www.who.int/growthref/bmi_girls_z_WHO2007_exp.txt')
carga_bmi_z_5_19('b', 'http://www.who.int/growthref/bmi_boys_z_WHO2007_exp.txt')