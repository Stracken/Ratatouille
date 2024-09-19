import { StyleSheet, TextInput, View, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import StyledText from "react-native-styled-text";
import Colors from "../constants/Colors";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

const ContactUsScreen = () => {
  const [userType, setUserType] = useState("particulier"); // État pour le type d'utilisateur
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [requestReason, setRequestReason] = useState("infoRequest");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const handleSubmit = () => {
  //     console.log('Selected:', selectedValue);
  //     // Vous pouvez ajouter ici la logique pour soumettre le formulaire
  // };
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
      <View style={styles.contactUsContainer}>
        <StyledText style={styles.contactUsText}>
          {
            "<i>Pour nous contacter, veuillez remplir le formulaire ci-dessous :</i>"
          }
        </StyledText>
        <View style={styles.contactUsForm}>
          {/* Choix entre Producteur et Particulier */}
          <StyledText style={styles.contactUsSubtitle}>Vous êtes :</StyledText>
          <RadioButton.Group
            onValueChange={(value) => setUserType(value)}
            value={userType}
          >
            <View style={styles.radioContainerMain}>
              <View style={styles.radioContainer}>
                <Text>Particulier</Text>
                <RadioButton value="particulier" />
              </View>
              <View style={styles.radioContainer}>
                <Text>Producteur</Text>
                <RadioButton value="producteur" />
              </View>
            </View>
          </RadioButton.Group>
          <TextInput
            style={styles.input}
            placeholder="Votre prénom"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Votre nom"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Votre email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="0600000000"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          {/* Champ à choix multiple pour le motif de la demande */}
          <StyledText style={styles.contactUsSubtitle}>
            Motif de la demande :
          </StyledText>
          <View style={styles.radioContainer}>
            <RNPickerSelect
              onValueChange={(value) => setRequestReason(value)}
              items={[
                { label: "Demande d'information", value: "infoRequest" },
                { label: "Réclamation", value: "réclamation" },
                { label: "Autres", value: "other" },
              ]}
              style={pickerSelectStyles}
              placeholder={{
                label: "Sélectionnez un motif...",
                value: null,
                color: Colors.danger,
              }}
            />
            {/* <RadioButton.Group
                            onValueChange={value => setRequestReason(value)}
                            value={requestReason}
                        >
                            <View style={styles.radioContainerMain}>
                                <View style={styles.radioContainer}>
                                    <Text style={styles.textInfoRequest}>Demande d'information</Text>
                                    <RadioButton value="infoRequest" />
                                </View>
                                <View style={styles.radioContainer}>
                                    <Text>Réclamation</Text>
                                    <RadioButton value="réclamation" />
                                </View>
                                <View style={styles.radioContainer}>
                                    <Text>Autres</Text>
                                    <RadioButton value="other" />
                                </View>
                            </View>
                            
                        </RadioButton.Group> */}
            <TextInput
              style={styles.inputMessage}
              placeholder="Votre message..."
              multiline
              numberOfLines={10}
              value={message}
              onChangeText={setMessage}
            />
          </View>
        </View>
      </View>
      <View>
        <StyledText style={styles.contactUsText2} textStyles={textStyles}>
          {"<b>Informations de Contact\n\n</>" +
            "- <i>Email : contact@terroterro.fr\n</i>" +
            "- <i>T\u00E9l\u00E9phone : 01 23 45 67 89\n</i>" +
            "- <i>Adresse : 1 Avenue des 40 Journaux, 33000 Bordeaux\n\n</i>" +
            "<b> Horaires d'ouverture\n\n</b>" +
            "- Lundi \u00E0 Vendredi : 9h00 - 17h00\n" +
            "- Samedi et Dimanche : Ferm\u00E9\n\n" +
            "<b> Suivez-nous:\n\n</b>" +
            "Restez connect\u00E9 avec nous sur nos r\u00E9seaux sociaux pour les derni\u00E8res nouvelles et mises \u00E0 jour:\n\n" +
            "- <i>Facebook : [Terro Terro Facebook](#)\n\n</i>" +
            "- <i>Instagram : [Terro Terro Instagram](#)\n\n</i>" +
            "Nous sommes impatients de recevoir de vos nouvelles !\n\n" +
            "<li>Citations:\n</li>" +
            "<li>[1] https://www.woodstreambrands.ca/brands/terro\n</li>" +
            "<li>[2] https://github.com/PowerShell/VSCode-powershell/issues/1680\n</li>" +
            "<li>[3] https://www.woodstream.com/our-brands/terro\n</li>" +
            "<li>[4] https://www.terro.com\n</li>" +
            "<li>[5] https://www.terro.com/contact-us\n</li>" +
            "<li>[6] https://www.terro.com/about-us\n</li>" +
            "<li>[7] https://www.service-public.fr/particuliers/vosdroits/F34846\n</li>" +
            "<li>[8] https://www.tribunal-de-paris.justice.fr/75/espace-journalistes\n</li>"}
        </StyledText>
      </View>
    </ScrollView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contactUsText: {
    fontSize: 16,
    textAlign: "justify",
  },
  contactUsText2: {
    fontSize: 16,
    textAlign: "justify",
    paddingHorizontal: 40,
  },
  contactUsSubtitle: {
    marginTop: 30,
    fontSize: 16,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  contactUsContainer: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    margin: 8,
    color: Colors.danger,
    fontSize: 18,
    borderWidth: 0.2,
    borderColor: Colors.danger,
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  contactUsForm: {
    margin: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 10,
    width: "90%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    fontSize: 18,
  },
  radioContainer: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
  radioContainerMain: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioText: {
    fontSize: 18,
    marginVertical: 5,
  },
  textInfoRequest: {
    width: 90,
  },
  inputMessage: {
    margin: 8,
    color: Colors.danger,
    fontSize: 18,
    borderWidth: 0.2,
    borderColor: Colors.danger,
    borderRadius: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // pour l'icône
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // pour l'icône
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
