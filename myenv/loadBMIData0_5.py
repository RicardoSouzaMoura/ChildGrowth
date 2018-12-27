import requests
import bmiZTupla as bmi
import firebase

def carga_bmi_z_0_5(gender, url):
    print('buscando dados de bmi for Age 0-5...')
    print('buscando dados de bmi Z...'+gender)
    urlBMIZ_0_5 = url
    bmiZ = requests.get(urlBMIZ_0_5)

    if (bmiZ.status_code == 200):
        bmiZTXT = bmiZ.text
        bmiZArray = bmiZTXT.split()
    
        # somente até o dia 1800 que são 60 meses
        bmiZArraySkipped = bmiZArray[10:18020]
        #print(bmiZArraySkipped[0])
        print(bmiZArraySkipped[len(bmiZArraySkipped)-1])

        cont = 0
        qtdLines = int(int(len(bmiZArraySkipped)/10)/30) + 1
        print(qtdLines)
        for x in range (0, qtdLines):
            dia = (int)(bmiZArraySkipped[cont])
            print('cont, dia ', cont, dia)
            if dia%30 == 0:
                tupla = bmi.BMIZTupla(gender, (str)((int)((int)(bmiZArraySkipped[cont])/30)), 
                    '', #L está vazio
                    '', #M está vazio
                    '', #S está vazio
                    bmiZArraySkipped[cont + 1], bmiZArraySkipped[cont + 2], 
                    bmiZArraySkipped[cont + 3], bmiZArraySkipped[cont + 4], 
                    bmiZArraySkipped[cont + 5], bmiZArraySkipped[cont + 6], 
                    bmiZArraySkipped[cont + 7], bmiZArraySkipped[cont + 8],
                    bmiZArraySkipped[cont + 9])
                cont = cont + 300 # somente pego mes a mes
                # insere no banco
                key = tupla.gender+''+tupla.month
                print('inserindo no banco a tupla: ', key)
                doc_ref = firebase.db.collection('bmiForAge').document(key)
                doc_ref.set({
                    u'month': int(tupla.month),
                    u'gender': tupla.gender,
                 #   u'L': tupla.L,
                 #   u'M': tupla.M,
                 #   u'S': tupla.S,
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

carga_bmi_z_0_5('g', 'http://www.who.int/childgrowth/standards/bfa_girls_z_exp.txt')
carga_bmi_z_0_5('b', 'http://www.who.int/childgrowth/standards/bfa_boys_z_exp.txt')