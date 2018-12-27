import requests
import heightZTupla as height
import firebase

def carga_height_z_0_5(gender, url):
    print('buscando dados de height for Age 0-5...')
    print('buscando dados de height Z...'+gender)
    urlHEIGHTZ_0_5 = url
    heightZ = requests.get(urlHEIGHTZ_0_5)

    if (heightZ.status_code == 200):
        heightZTXT = heightZ.text
        heightZArray = heightZTXT.split()
    
        # somente até o dia 1800 que são 60 meses
        heightZArraySkipped = heightZArray[10:18020]
        #print(heightZArraySkipped[0])
        print(heightZArraySkipped[len(heightZArraySkipped)-1])

        cont = 0
        qtdLines = int(int(len(heightZArraySkipped)/10)/30) + 1
        print(qtdLines)
        for x in range (0, qtdLines):
            dia = (int)(heightZArraySkipped[cont])
            print('cont, dia ', cont, dia)
            if dia%30 == 0:
                tupla = height.HeightZTupla(gender, (str)((int)((int)(heightZArraySkipped[cont])/30)), 
                    '', #L está vazio
                    '', #M está vazio
                    '', #S está vazio
                    '', #StDev está vazio
                    '', #SD5neg está vindo vazio
                    heightZArraySkipped[cont + 1], heightZArraySkipped[cont + 2], 
                    heightZArraySkipped[cont + 3], heightZArraySkipped[cont + 4], 
                    heightZArraySkipped[cont + 5], heightZArraySkipped[cont + 6], 
                    heightZArraySkipped[cont + 7], heightZArraySkipped[cont + 8],
                    heightZArraySkipped[cont + 9])
                cont = cont + 300 # somente pego mes a mes
                # insere no banco
                key = tupla.gender+''+tupla.month
                print('inserindo no banco a tupla: ', key)
                doc_ref = firebase.db.collection('heightForAge').document(key)
                doc_ref.set({
                    u'month': int(tupla.month),
                    u'gender': tupla.gender,
                 #   u'L': tupla.L,
                 #   u'M': tupla.M,
                 #   u'S': tupla.S,
                 #   u'StDev': tupla.StDev,
                 #   u'SD5neg': tupla.SD5neg,
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

carga_height_z_0_5('g', 'http://www.who.int/childgrowth/standards/lhfa_girls_z_exp.txt')
carga_height_z_0_5('b', 'http://www.who.int/childgrowth/standards/lhfa_boys_z_exp.txt')