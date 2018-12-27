import requests
import heightZTupla as height
import firebase

def carga_height_z_5_19(gender, url):
    print('buscando dados de height for Age 5-19...')
    print('buscando dados de height Z...'+gender)
    urlHEIGHTZ_5_19 = url
    heightZ = requests.get(urlHEIGHTZ_5_19)

    if (heightZ.status_code == 200):
        heightZTXT = heightZ.text
        heightZArray = heightZTXT.split()
    
        heightZArraySkipped = heightZArray[15:]
        #print(heightZArraySkipped)

        cont = 0
        qtdLines = int(len(heightZArraySkipped)/15)
        print(qtdLines)
        for x in range (0, qtdLines):
            tupla = height.HeightZTupla(gender, heightZArraySkipped[cont], 
                heightZArraySkipped[cont + 1], heightZArraySkipped[cont + 2], 
                heightZArraySkipped[cont + 3], heightZArraySkipped[cont + 4],
                heightZArraySkipped[cont + 5], heightZArraySkipped[cont + 6], 
                heightZArraySkipped[cont + 7], heightZArraySkipped[cont + 8], 
                heightZArraySkipped[cont + 9], heightZArraySkipped[cont + 10], 
                heightZArraySkipped[cont + 11], heightZArraySkipped[cont + 12],
                heightZArraySkipped[cont + 13], heightZArraySkipped[cont + 14])
            cont = cont + 15
            print('inserindo no banco a tupla '+tupla.month+'...')
            # insere no banco
            key = tupla.gender+''+tupla.month
            doc_ref = firebase.db.collection('heightForAge').document(key)
            doc_ref.set({
                u'month': int(tupla.month),
                u'gender': tupla.gender,
                #u'L': tupla.L,
                #u'M': tupla.M,
                #u'S': tupla.S,
                #u'StDev': tupla.StDev,
                #u'SD5neg': tupla.SD5neg,
                u'SD4neg': tupla.SD4neg,
                u'SD3neg': tupla.SD3neg,
                u'SD2neg': tupla.SD2neg,
                u'SD1neg': tupla.SD1neg,
                u'SD0': tupla.SD0,
                u'SD1': tupla.SD1,
                u'SD2': tupla.SD2,
                u'SD3': tupla.SD3,
                u'SD4': tupla.SD4
            })

    
    print('finalizando a carga...')

carga_height_z_5_19('g', 'http://www.who.int/growthref/hfa_girls_z_WHO2007_exp.txt')
carga_height_z_5_19('b', 'http://www.who.int/growthref/hfa_boys_z_WHO2007_exp.txt')