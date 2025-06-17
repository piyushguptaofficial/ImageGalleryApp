import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type CardProps = {
    item: {
        id: number;
        url: string;
        title: string;
    };
};

const Card: React.FC<CardProps> = ({ item }) => {
    return (
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={{ backgroundColor: 'white', margin: 10 }}>
                <Image source={{ uri: item.url }} style={{ width: '100%', height: 200 }} />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </Link>

    );
};

export default Card;
