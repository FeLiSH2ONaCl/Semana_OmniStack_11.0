import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
/*TouchableOpacity deixa qualquer coisa clicavel */
/**FlatList USADO PARA FAZER LISTAS */
import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import styles from './styles';

export default function Incidents(){
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation(); /**Permite a navegação entre páginas */

  function navigationToDetail(incident){
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.lenght === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params:{ page }
    });

    setIncidents([...incidents, ...response.data ]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style = {styles.container} >
      <View style = {styles.header} >
        <Image source = {logoImg} />
        <Text style = {styles.headerText} >
          Total de <Text style = {styles.headerTextBold} >{total} casos</Text>.
        </Text>
      </View>

      <Text style = {styles.title} >Bem-vindo!</Text>
      <Text style = {styles.description} >Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style = {styles.incidentList}
        data = {incidents}
        keyExtractor = {incident => String(incident.id)}
        showsVerticalScrollIndicator = {true} /**retira a barra de rolagem */
        onEndReached = {loadIncidents}
        onEndReachedThreshold = {0.2}
        renderItem = {({ item: incident }) => (
          <View style = {styles.incident} >
              <Text style = {styles.incidentPorpety} >ONG: </Text>
              <Text style = {styles.incidentValue} >{incident.name}</Text>

              <Text style = {styles.incidentPorpety} >CASO: </Text>
              <Text style = {styles.incidentValue} >{incident.title}</Text>

              <Text style = {styles.incidentPorpety} >VALOR: </Text>
              <Text style = {styles.incidentValue} >{Intl.NumberFormat('pt-BR',{ 
                style: 'currency', 
                currency : 'BRL' 
                }).format(incident.value) }</Text>

            <TouchableOpacity 
              style = {styles.detailsButton} 
              onPress = {() => navigationToDetail(incident)}
            >
              <Text style = { styles.detailsButtonText } >Ver mais detalhes</Text>
              <Feather name = 'arrow-right' size = {16} color = '#e02041' />
            </TouchableOpacity>
          </View>
        )} /** usa-se ()  pois retorna um JX*/
      />
    </View>
  );
}