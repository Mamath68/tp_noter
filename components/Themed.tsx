import {
    Button as DefaultButton,
    Text as DefaultText,
    TextInput as DefaultInput,
    View as DefaultView
} from 'react-native';
import Colors from '@/constants/Colors';
import {useColorScheme} from './useColorScheme';

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeProps & DefaultButton['props'];
export type InputProps = ThemeProps & DefaultInput['props'];

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function Text(props: TextProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

    return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function Button(props: ButtonProps) {
    const {color, lightColor, darkColor, ...otherProps} = props;
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

    return (
        <View style={[{backgroundColor}]}>
            <DefaultButton color={color} {...otherProps} />
        </View>
    )
}

export function Input(props: InputProps) {
    const {
        style,
        keyboardType,
        value,
        onChangeText,
        onChange,
        placeholderTextColor,
        placeholder,
        lightColor,
        darkColor,
        ...otherProps
    } = props;
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <DefaultInput
        style={[{color},
            {
                borderColor: color,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 5,
            },
            style]
        }
        placeholderTextColor={color}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onChange={onChange}
        value={value}
        {...otherProps}
    />;
}

