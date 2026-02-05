abstract class Shape {

    // Abstract method
    abstract double area();

    // Concrete method
    void display() {
        System.out.println("This is a shape");
    }
}

class Circle extends Shape {

    int radius = 5;

    // Implementing abstract metho
    @Override
    double area() {
        return 3.14 * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {

        Shape shape = new Circle();  // Upcasting
        shape.display();
        System.out.println("Area of Circle: " + shape.area());
    }
}
