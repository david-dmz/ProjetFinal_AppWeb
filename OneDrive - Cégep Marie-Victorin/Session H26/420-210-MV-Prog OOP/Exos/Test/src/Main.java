import java.util.Date;
import java.util.Scanner;

class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int quantite;
        String nom;

        System.out.print("Entrez votre nom: ");
        nom = sc.nextLine();

        System.out.printf("Bonjour %s\n Combien de limonade veut tu acheter? : ", nom);
        quantite = sc.nextInt();

        Limonade commande = new Limonade(nom, quantite);
        commande.afficherFacture();

        sc.close();
    }
}
