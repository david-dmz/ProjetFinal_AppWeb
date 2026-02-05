import java.util.Scanner;//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or

void main() {


    // initialisation
    Scanner sc = new Scanner(System.in);
    /* Je declare une variable du nom X
     La variable X est de type Y
     Je vais construire un objet Y avec new en utilisant des parametres (optionnel)
     L'objet  Y est assigné à la variable X
     */

    double price = 0;
    double totalPrice;
    int numberLimonade;
    String choice;
    Limonade limonade = null;

    IO.print("Entrez votre nom svp: ");
    String clientName = sc.nextLine();

    while (true) {
        IO.print("Limonade rose ou jaune: ");
        if (!sc.hasNextLine()) {
            IO.println("ERREUR ! : Entrez une valeur valide");
            sc.nextLine();
            continue;
        }
        choice = sc.nextLine();
        break;
    }

    while (true) {
        IO.print("Combien de limonade  : ");
        if (!sc.hasNextInt()) {
            IO.println("ERREUR! : Veuillez entrer un nombre entier ");
            sc.nextLine();
            continue;
        }
        numberLimonade = sc.nextInt();
        break;
    }

    switch (choice) {
        case "rose" -> {
            IO.println("Choix de limonade rose enregistré");
            limonade = new Limonade("rose", 3);
            price = limonade.getPrix();
        }
        case "jaune" -> {
            IO.println("Choix de limonade jaune enregistré");
            limonade = new Limonade("jaune", 2);
            price = limonade.getPrix();
        }
        default -> {
        }
    }

    totalPrice = price * numberLimonade;
    IO.println(String.format("Voici votre commande %s. Le total de votre commande est de %.2f$\n", clientName, totalPrice));
    IO.println(String.format("Votre limonade est de couleur %s", limonade.getCouleur()));

    sc.close();
}