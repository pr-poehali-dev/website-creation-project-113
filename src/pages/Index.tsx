import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const products = [
  {
    id: 1,
    name: 'Кроватка "Облако"',
    price: 24990,
    category: 'Кроватки',
    description: 'Уютная детская кроватка из натурального дерева с мягким текстилем пастельных оттенков',
    image: 'https://cdn.poehali.dev/projects/d80e8d58-48df-4d35-81c2-a0c2be8e6957/files/9a5728ff-e888-4310-b7ce-22a27365b44c.jpg'
  },
  {
    id: 2,
    name: 'Шкаф "Радуга"',
    price: 32990,
    category: 'Шкафы',
    description: 'Просторный шкаф с яркими акцентами для хранения детских вещей',
    image: 'https://cdn.poehali.dev/projects/d80e8d58-48df-4d35-81c2-a0c2be8e6957/files/6d021e9f-6920-437a-bb1b-85d6685c0735.jpg'
  },
  {
    id: 3,
    name: 'Письменный стол "Мечта"',
    price: 18990,
    category: 'Столы',
    description: 'Эргономичный стол со стулом для учебы и творчества',
    image: 'https://cdn.poehali.dev/projects/d80e8d58-48df-4d35-81c2-a0c2be8e6957/files/2d84d12d-1746-4a74-9c60-7c05acb140d8.jpg'
  },
  {
    id: 4,
    name: 'Комод "Солнышко"',
    price: 15990,
    category: 'Комоды',
    description: 'Вместительный комод с плавными формами и безопасными углами',
    image: 'https://cdn.poehali.dev/projects/d80e8d58-48df-4d35-81c2-a0c2be8e6957/files/9a5728ff-e888-4310-b7ce-22a27365b44c.jpg'
  },
  {
    id: 5,
    name: 'Стеллаж "Сказка"',
    price: 12990,
    category: 'Стеллажи',
    description: 'Открытый стеллаж для книг и игрушек в нежных тонах',
    image: 'https://cdn.poehali.dev/projects/d80e8d58-48df-4d35-81c2-a0c2be8e6957/files/6d021e9f-6920-437a-bb1b-85d6685c0735.jpg'
  },
  {
    id: 6,
    name: 'Кресло "Зайка"',
    price: 8990,
    category: 'Кресла',
    description: 'Мягкое детское кресло с экологичной обивкой',
    image: 'https://cdn.poehali.dev/projects/d80e8d58-48df-4d35-81c2-a0c2be8e6957/files/2d84d12d-1746-4a74-9c60-7c05acb140d8.jpg'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Анна М.',
    text: 'Восхитительная мебель! Качество на высоте, дочка в восторге от своей новой комнаты. Все продумано до мелочей.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna'
  },
  {
    id: 2,
    name: 'Дмитрий К.',
    text: 'Заказывали кроватку и шкаф. Доставка быстрая, сборка простая. Материалы экологичные, без запаха.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry'
  },
  {
    id: 3,
    name: 'Елена П.',
    text: 'Очень довольны покупкой! Дизайн современный и нежный, идеально вписался в интерьер детской.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cart, setCart] = useState<number[]>([]);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success('Товар добавлен в заказ');
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(id => id !== productId));
    toast.info('Товар удален из заказа');
  };

  const cartProducts = products.filter(p => cart.includes(p.id));
  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
    setIsOrderDialogOpen(false);
    setCart([]);
    setFormData({ name: '', phone: '', email: '', address: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Home" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Детская Мебель</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setIsOrderDialogOpen(true)}
          >
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            Заказ
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      <section className="py-20 px-4 bg-gradient-to-r from-secondary/30 via-accent/30 to-muted/50 animate-fade-in">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Мебель для детской мечты
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Создаем безопасное и уютное пространство для развития и творчества вашего ребенка
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Sparkles" size={20} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setIsOrderDialogOpen(true)}>
              <Icon name="Phone" size={20} className="mr-2" />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-foreground">Наш каталог</h3>
          
          <div className="flex gap-2 justify-center mb-12 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className="transition-all"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-xl">{product.name}</CardTitle>
                  <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
                  <p className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  {cart.includes(product.id) ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <Icon name="Check" size={20} className="mr-2" />
                      В заказе
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => addToCart(product.id)}
                    >
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Добавить в заказ
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-foreground">Отзывы наших клиентов</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card 
                key={review.id}
                className="animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-4xl font-bold mb-6 text-foreground">Готовы создать идеальную детскую?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Мы поможем подобрать идеальную мебель и ответим на все вопросы
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8"
            onClick={() => setIsOrderDialogOpen(true)}
          >
            <Icon name="Mail" size={20} className="mr-2" />
            Оформить заказ
          </Button>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Home" size={24} />
            <span className="text-xl font-bold">Детская Мебель</span>
          </div>
          <p className="text-background/80 mb-4">Создаем уют и безопасность для ваших детей</p>
          <div className="flex gap-6 justify-center text-sm">
            <a href="tel:+79991234567" className="hover:text-background/80 transition-colors">
              +7 (999) 123-45-67
            </a>
            <a href="mailto:info@kidsfurniture.ru" className="hover:text-background/80 transition-colors">
              info@kidsfurniture.ru
            </a>
          </div>
        </div>
      </footer>

      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
            <DialogDescription>
              Заполните форму, и мы свяжемся с вами для уточнения деталей
            </DialogDescription>
          </DialogHeader>

          {cart.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="ShoppingCart" size={18} />
                Выбранные товары:
              </h4>
              <div className="space-y-2">
                {cartProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center text-sm">
                    <span>{product.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.price.toLocaleString('ru-RU')} ₽</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ваше имя *</Label>
              <Input 
                id="name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input 
                id="phone" 
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="address">Адрес доставки *</Label>
              <Input 
                id="address" 
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Город, улица, дом, квартира"
              />
            </div>

            <div>
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea 
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                placeholder="Дополнительные пожелания или вопросы"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Icon name="Send" size={20} className="mr-2" />
              Отправить заказ
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
