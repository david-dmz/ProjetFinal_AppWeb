public class Limonade {

    private double prix;
    private String couleur;

    public Limonade(String couleur, double prix) {
        this.prix = prix;
        this.couleur = couleur;
    }

    public double getPrix() {
        return prix;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }
}
