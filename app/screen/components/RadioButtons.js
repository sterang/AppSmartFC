import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class RadioButtons extends Component {
	state = {
		value: null,
	};
    calc(value){
        this.props.callback(value);
    }
	render() {
		const { options } = this.props;
		const { value } = this.state;
		return (
			<View>
				{options.map(item => {
					return (
                    <View>
						<View key={item.key.toString()} style={styles.buttonContainer}>
                            <TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.setState({
										value: item.key,
									});
                                    this.calc(item.key);
								}}
							    >
					            {value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
							<Text>{item.text}</Text>
						</View>
                    </View>
					);
				})}
			</View>
		);
	}
}
//alignItems: 'center',
//justifyContent: 'space-between',
const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	circle: {
		height: 25,
		width: 25,
		borderRadius: 10,
        borderWidth: 2,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
		borderColor: '#ACACAC',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
	},
});
