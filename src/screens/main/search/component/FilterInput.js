import React from 'react'
import { Picker, View, Typography } from 'react-native-ui-lib';

const { Item } = Picker

export const FilterInput = ({
                                placeholder,
                                data,
                                value,
                                onChange
                            }) => {
    return (
        <View>
            <Picker value={value} onChange={onChange} placeholder={placeholder} style={{color: 'rgba(0,0,0,0.5)'}}>
                <Item value={undefined} label={placeholder}/>
                {data.map((el) => <Item key={el.value} value={el.value} label={el.label}/>)}
            </Picker>
        </View>
    )
}
