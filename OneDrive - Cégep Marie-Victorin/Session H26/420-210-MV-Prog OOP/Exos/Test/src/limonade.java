class Limonade {

    final double PRIX = 1.75;
    String nom;
    int quantite;

    public Limonade(String nom, int quantite) {
        this.nom = nom;
        this.quantite = quantite;
    }

    public double calculerTotal() {
        return PRIX * quantite;
    }

    public void afficherFacture() {
        System.out.printf("Le total de votre facture est de : %.2f$\n", calculerTotal());
    }
}