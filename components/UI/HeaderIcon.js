import { Image, StyleSheet } from "react-native";

const HeaderIcon = ({image}) => {
    return (
        <Image
            style={styles.headerIcon}
            source={image}
            resizeMode="cover"
        />
    );
};

export default HeaderIcon;

const styles = StyleSheet.create({
    headerIcon: {
      width: 35,
      height:35,
      marginRight: 15,
    }
  });