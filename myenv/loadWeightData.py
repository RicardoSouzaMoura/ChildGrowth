import requests
import wfaZTupla as wfa
import firebase

def carga_wfa_z_5_10(gender, url):
    print('buscando dados de WFA for Age 5-10...')
    urlWFAZ_5_10 = url
    wfaZ = requests.get(urlWFAZ_5_10)

    if (wfaZ.status_code == 200):
        wfaZTXT = wfaZ.text
        wfaZArray = wfaZTXT.split()
    
        wfaZArraySkipped = wfaZArray[13:]
        #print(wfaGirlsZArraySkipped)

        cont = 0
        qtdWords = int(len(wfaZArraySkipped)/13)
        print(qtdWords)
        for x in range (0, qtdWords):
            tupla = wfa.WFAZTupla(gender, wfaZArraySkipped[cont], 
                wfaZArraySkipped[cont + 1], wfaZArraySkipped[cont + 2], 
                wfaZArraySkipped[cont + 3], wfaZArraySkipped[cont + 4], 
                wfaZArraySkipped[cont + 5], wfaZArraySkipped[cont + 6], 
                wfaZArraySkipped[cont + 7], wfaZArraySkipped[cont + 8], 
                wfaZArraySkipped[cont + 9], wfaZArraySkipped[cont + 10], 
                wfaZArraySkipped[cont + 11], wfaZArraySkipped[cont + 12])
            cont = cont + 13
            print('inserindo no banco a tupla '+tupla.month+'...')
            # insere no banco
            key = tupla.gender+''+tupla.month
            doc_ref = firebase.db.collection('weightForAge').document(key)
            doc_ref.set({
                u'month': int(tupla.month),
                u'gender': tupla.gender,
                #u'L': tupla.L,
                #u'M': tupla.M,
                #u'S': tupla.S,
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

carga_wfa_z_5_10('g', 'http://www.who.int/growthref/wfa_girls_z_WHO2007_exp.txt')
carga_wfa_z_5_10('b', 'http://www.who.int/growthref/wfa_boys_z_WHO2007_exp.txt')