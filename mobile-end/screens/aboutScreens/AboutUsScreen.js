import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import StyledText from "react-native-styled-text";

const AboutUsScreen = () => {
  const textStyles = StyleSheet.create({
    bold: {
      fontWeight: "bold",
    },
    italic: {
      fontStyle: "italic",
    },
    underline: {
      textDecorationLine: "underline",
    },
    normal: {
      fontSize: 16,
      textAlign: "justify",
    },
    li: {
      fontStyle: "italic",
      fontSize: 9,
    },
  });
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.mentionsLegalesContainer}>
        <StyledText style={styles.mentionsLegales} textStyles={textStyles}>
          {"<b>Qui sommes-nous ?</b>\n\n" +
            "Chez <b>TERRO TERRO</b>, nous sommes passionnés par l'agriculture durable et la mise en relation directe entre les consommateurs et les producteurs locaux. Notre plateforme est dédiée à promouvoir les produits agricoles de qualité tout en soutenant les agriculteurs de notre région.\n\n" +
            "<b>Notre Mission</b>\n\n" +
            "Notre mission est simple :\nfaciliter l'accès à des produits frais et locaux pour les consommateurs tout en offrant une vitrine aux producteurs. Nous croyons fermement que chaque achat local contribue à une économie plus forte et à une communauté plus soudée.\n\n" +
            "<b>Notre Histoire</b>\n\n" +
            "Fondée en 2024, TERRO TERRO a vu le jour grâce à l'initiative de [nom du fondateur ou des fondateurs], qui souhaitaient créer un pont entre les agriculteurs et les consommateurs. Depuis nos débuts, nous avons élargi notre gamme de produits pour inclure une variété d'options allant des fruits et légumes frais aux produits artisanaux.\n\n" +
            "<b>Ce que nous offrons</b>\n\n" +
            "   -<b>Produits Locaux</b>: Une sélection de produits frais provenant directement des fermes de notre région.\n\n" +
            " -<b>Transparence</b> : Nous mettons un point d'honneur à ce que chaque produit soit traçable, permettant aux consommateurs de connaître l'origine de ce qu'ils achètent.\n\n" +
            "   -<b>Engagement Écologique</b> :\nNous soutenons des pratiques agricoles durables et respectueuses de l'environnement.\n\n" +
            "<b>Pourquoi choisir TERRO TERRO ?</b>\n\n" +
            "En choisissant TERRO TERRO, vous ne faites pas qu'acheter des produits ; vous soutenez également une communauté d'agriculteurs passionnés. Chaque achat contribue à la durabilité de l'agriculture locale et aide à préserver notre patrimoine culinaire.\n\n" +
            "<b>Contactez-nous</b>\n\n" +
            "Pour toute question ou information supplémentaire, n'hésitez pas à nous contacter :\n\n" +
            "-  Email  : contact@terroterro.fr\n" +
            "-  Adresse  : 1 Avenue des 40 Journaux, 33000 Bordeaux\n\n" +
            "Rejoignez-nous dans notre mission de valoriser l'agriculture locale et de promouvoir des choix alimentaires durables. Ensemble, faisons la différence !\n\n" +
            "<li>Citations:\n</li>" +
            "<li>[1] https://www.woodstreambrands.ca/brands/terro\n</li>" +
            "<li>[2] https://www.terro.com/about-us\n</li>" +
            "<li>[3] https://www.woodstream.com/our-brands/terro\n</li>" +
            "<li>[4] https://www.terro.com\n</li>" +
            "<li>[5] https://learn.microsoft.com/fr-fr/visualstudio/ide/finding-and-replacing-text?view=vs-2022\n</li>" +
            "<li>[6] https://www.youtube.com/watch?v=1Z1JCuwXmiQ\n</li>" +
            "<li>[7] https://declersoft.net/raccourci-visual-studio-code/\n</li>" +
            "<li>[8] https://www.jesuisundev.com/gagne-du-temps-avec-visual-studio-code/\n</li>"}
        </StyledText>
      </View>
    </ScrollView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  mentionsLegales: {
    fontSize: 16,
    textAlign: "justify",
  },
  mentionsLegalesContainer: {
    padding: 20,
    alignItems: "center",
  },
});
