import React from 'react'
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native'
import {
  Appbar,
  TextInput,
  DataTable,
  Title,
  Paragraph,
} from 'react-native-paper'
import styleType from '../../utils/styleType'

type State = {
  age: number
  height: number
  weight: number
}

export default class extends React.Component<any, State> {
  state = {
    age: 26,
    height: 176,
    weight: 65,
  }

  render() {
    // Harris-Benedictの式による基礎代謝導出(男性版)
    const bee =
      66.4730 +
      13.7516 * this.state.weight +
      5.0033 * this.state.height -
      6.7550 * this.state.age

    // 体重比2倍を鶏むねで摂る(0.223g/1g)
    const chicken = (this.state.weight * 2) / 0.22
    // 鶏むねの脂質
    const chickenFat = chicken * 0.02
    // 必要脂質[g]
    const reqFat = bee * 0.3 / 9
    // 鶏皮換算(0.49g/1g)
    const chickenSkin = (reqFat - chickenFat) / 0.49

    // 残りのカロリーを生米で摂る
    const rice = (bee - (1.08 * chicken) - (4.97 * chickenSkin)) / 3.56

    const protein = chicken * 0.22 + chickenSkin * 0.1 + rice * 0.06
    const fat = chicken * 0.02 + rice * 0.01 + chickenSkin * 0.49
    const carbo = rice * 0.77
    const totalCal = (protein * 4) + (carbo * 4) + (fat * 9)

    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.Content title="沼計算くん" />
        </Appbar.Header>

        <ScrollView style={styles.container}>
            <TextInput
              label="年齢[歳]"
              mode="outlined"
              keyboardType="numeric"
              style={styles.textInputContainer}
              value={this.state.age.toString()}
              onChangeText={text => this.setState({ age: Number(text) })}
            />

            <TextInput
              label="身長[cm]"
              mode="outlined"
              keyboardType="numeric"
              style={styles.textInputContainer}
              value={this.state.height.toString()}
              onChangeText={text => this.setState({ height: Number(text) })}
            />

            <TextInput
              label="体重[kg]"
              mode="outlined"
              keyboardType="numeric"
              style={styles.textInputContainer}
              value={this.state.weight.toString()}
              onChangeText={text => this.setState({ weight: Number(text) })}
            />

            <View style={styles.tableContainer}>
              <Title>沼の材料</Title>

              <Paragraph>基礎代謝: {Math.ceil(bee)} [kcal]</Paragraph>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>材料</DataTable.Title>
                  <DataTable.Title numeric>分量</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>鶏むね肉</DataTable.Cell>
                  <DataTable.Cell numeric>{Math.ceil(chicken)} [g]</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>鶏皮</DataTable.Cell>
                  <DataTable.Cell numeric>{Math.ceil(chickenSkin)} [g]</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>白米</DataTable.Cell>
                  <DataTable.Cell numeric>{Math.ceil(rice)} [g]</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>水</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {Math.ceil(rice * 7)} [ml]
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>

            <View style={styles.tableContainer}>
              <Title>栄養素</Title>

              <Paragraph>摂取カロリー: {Math.ceil(totalCal)} [kcal]</Paragraph>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>栄養素</DataTable.Title>
                  <DataTable.Title numeric>質量</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>たんぱく質</DataTable.Cell>
                  <DataTable.Cell numeric>{Math.ceil(protein)} [g]</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>糖質</DataTable.Cell>
                  <DataTable.Cell numeric>{Math.ceil(carbo)} [g]</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>脂質</DataTable.Cell>
                  <DataTable.Cell numeric>{Math.ceil(fat)} [g]</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
        </ScrollView>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: styleType<ViewStyle>({
    marginHorizontal: 16,
  }),
  textInputContainer: styleType<ViewStyle>({
    marginVertical: 8,
  }),
  tableContainer:styleType<ViewStyle>({
    marginVertical: 8,
  }),
})
