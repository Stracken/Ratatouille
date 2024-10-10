import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import StyledText from "react-native-styled-text";

const MentionsLegales = () => {
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
          {"<b>Mentions légales</b>\n\n" +
            "Le site Terro Terro est édité par :\n" +
            "<b>TERRO TERRO</b>" +
            " Société par actions simplifiée au capital de 1 000 €" +
            "Siège social : 1 Avenue des 40 Journaux, 33000 Bordeaux" +
            "RCS Bordeaux 900 601 352[8]" +
            "N° TVA intracommunautaire : FR12900601352\n\n" +
            "<b> Directeur de la publication </b>\n\n" +
            "Le directeur de la publication est M. Jean Dupont, en sa qualité de Président de la société TERRO TERRO.\n\n" +
            "<b> Hébergeur </b>\n\n" +
            "Le site est hébergé par la société WIGI\n" +
            "1 Avenue des 40 Journaux - 33000 Bordeaux - France\n\n" +
            "<b> Activité </b>\n\n" +
            "Terro Terro est une plateforme de mise en relation entre des clients et des producteurs agricoles.\n" +
            " Protection des données personnelles  \n" +
            "Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Vous pouvez exercer ce droit en nous contactant à l'adresse : contact@terroterro.fr\n\n" +
            "<b> Propriété intellectuelle </b>\n\n" +
            "L'ensemble du contenu du site Terro Terro (textes, images, vidéos, etc.) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.\n\n" +
            "<b> Liens hypertextes </b>\n\n" +
            "Le site Terro Terro peut contenir des liens vers d'autres sites. Nous ne sommes pas responsables du contenu de ces sites externes.\n\n" +
            "<b> Litiges </b>\n\n" +
            "En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents.\n\n" +
            "<b> Contact </b>\n\n" +
            "Pour toute question, vous pouvez nous contacter à l'adresse suivante :\n\n" +
            "TERRO TERRO\n" +
            "1 Avenue des 40 Journaux\n" +
            "33000 BORDEAUX\n" +
            "Email : contact@terroterro.fr \n\n" +
            "<li>Citations:</li>\n" +
            "<li>[1] https://www.murielle-cahen.fr/avocat/internet-et-droit/fournisseur-acces/%E2%80%9Dhttps:/www.murielle-cahen.fr/avocat/internet-et-droit/fournisseur-acces/</li>\n" +
            "<li>[2] https://www.village-justice.com/articles/injonctions-retrait-des-contenus-caractere-terroriste-risque-atteinte-liberte,48798.html</li>\n" +
            "<li>[3] https://www.avocat-rouaselbazis.com/attentats-terroristes_al11.html</li>\n" +
            "<li>[4] https://www.dgsi.interieur.gouv.fr/decouvrir-la-dgsi/nos-missions/police-judiciaire-specialisee/services-judiciaires-anti-terroristes</li>\n" +
            "<li>[5] https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?from=EN&uri=CELEX%3A52018PC0640</li>\n" +
            "<li>[6] https://www.vie-publique.fr/loi/285972-loi-16-aout-2022-retrait-contenus-terroristes-sur-internet-dans-lheure</li>\n" +
            "<li>[7] https://www.alpes-maritimes.gouv.fr/Actions-de-l-Etat/Securite-et-protection-de-la-population/Menace-terroriste/Comment-reagir-en-cas-d-attaque-terroriste</li>\n" +
            "<li>[8] https://www.pappers.fr/entreprise/terroart-900601352</li>\n"}
        </StyledText>
      </View>
    </ScrollView>
  );
};

export default MentionsLegales;

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
    alignContent: "center",
  },
});
