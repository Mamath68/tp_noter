import {Link} from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import {Platform} from 'react-native';
import {ComponentProps} from "react";

export function ExternalLink(
    props: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }
) {
    return (
        <Link
            target="_blank"
            {...props}
            // @ts-expect-error: External URLs are not typed.
            href={props.href}
            onPress={(e) => {
                if (Platform.OS !== 'web') {
                    e.preventDefault();
                    WebBrowser.openBrowserAsync(props.href as string);
                }
            }}
        />
    );
}
