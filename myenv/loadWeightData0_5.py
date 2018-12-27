import requests
import wfaZTupla as wfa
import firebase

def carga_wfa_z_0_5(gender, url):
    print('buscando dados de wfa for Age 0-5...')
    print('buscando dados de wfa Z...'+gender)
    urlWFAZ_0_5 = url
    wfaZ = requests.get(urlWFAZ_0_5)

    if (wfaZ.status_code == 200):
        wfaZTXT = wfaZ.text
        wfaZArray = wfaZTXT.split()
    
        # somente até o dia 1800 que são 60 meses
        wfaZArraySkipped = wfaZArray[10:18020]
        #print(wfaZArraySkipped[0])
        print(wfaZArraySkipped[len(wfaZArraySkipped)-1])

        cont = 0
        qtdLines = int(int(len(wfaZArraySkipped)/10)/30) + 1
        print(qtdLines)
        for x in range (0, qtdLines):
            dia = (int)(wfaZArraySkipped[cont])
            print('cont, dia ', cont, dia)
            if dia%30 == 0:
                tupla = wfa.WFAZTupla(gender, (str)((int)((int)(wfaZArraySkipped[cont])/30)), 
                    '', #L está vazio
                    '', #M está vazio
                    '', #S está vazio
                    wfaZArraySkipped[cont + 1], wfaZArraySkipped[cont + 2], 
                    wfaZArraySkipped[cont + 3], wfaZArraySkipped[cont + 4], 
                    wfaZArraySkipped[cont + 5], wfaZArraySkipped[cont + 6], 
                    wfaZArraySkipped[cont + 7], wfaZArraySkipped[cont + 8],
                    wfaZArraySkipped[cont + 9])
                cont = cont + 300 # somente pego mes a mes
                # insere no banco
                key = tupla.gender+''+tupla.month
                print('inserindo no banco a tupla: ', key)
                doc_ref = firebase.db.collection('weightForAge').document(key)
                doc_ref.set({
                    u'month': int(tupla.month),
                    u'gender': tupla.gender,
                 #   u'L': tupla.L,
                 #   u'M': tupla.M,
                 #   u'S': tupla.S,
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

carga_wfa_z_0_5('g', 'http://www.who.int/childgrowth/standards/wfa_girls_z_exp.txt')
carga_wfa_z_0_5('b', 'http://www.who.int/childgrowth/standards/wfa_boys_z_exp.txt')