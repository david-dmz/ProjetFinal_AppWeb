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
       double totalPrice = 0;
       int numberLimonade = 0;

       IO.print("Entrez votre nom svp: ");
       String clientName = sc.nextLine();

       IO.print("Limonade rose ou jaune: ");
       String choice = sc.nextLine();

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
               Limonade LimonadeRose = new Limonade("rose", 3);
               price = LimonadeRose.prix;
           }
           case "jaune" -> {
               IO.println("Choix de limonade jaune enregistré");
               Limonade LimonadeJaune = new Limonade("rose", 2);
               price = LimonadeJaune.prix;
           }
           default -> {
           }
       }

       totalPrice = price * numberLimonade;
       IO.println(String.format("Voici votre commande %s. Le total de votre commande est de %.2f$\n Merci!", clientName, totalPrice));

       sc.close();


}