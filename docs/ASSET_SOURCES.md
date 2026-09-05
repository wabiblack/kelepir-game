# KELEPİR Asset Kaynakları

Bu dosya projede kullanılan üçüncü taraf görsel paketlerin kaynağını, lisansını ve KELEPİR içindeki rolünü takip eder.

## Güncel resmi sanat yönü

KELEPİR'in aktif görsel dili **karşıdan görünen 2D detaylı pixel art** olarak sabitlenmiştir.

Zorunlu kurallar:

1. İzometrik görünüm kullanılmaz.
2. Top-down / 3-çeyrek kamera ana oyun sahnelerinde kullanılmaz.
3. Mekân oyuncunun karşısındadır; oda, tezgâh, dükkân ve ürünler önden veya doğal side-view perspektifte okunur.
4. Ücretsiz ve lisansı açıkça doğrulanmış hazır assetler kullanılır.
5. Sıfırdan yeni görsel çizilmez. Uygun hazır asset bulunana kadar arama genişletilir.
6. Aynı ekranda farklı perspektif, kontur ve detay seviyesine sahip paketler rastgele karıştırılmaz.
7. Pixel assetler tarayıcıda `image-rendering: pixelated` / `crisp-edges` mantığıyla gösterilir; blur ve yumuşak upscale kullanılmaz.
8. 2002 başlangıç dönemine uymayan telefon, araç, bilgisayar, tabela ve ürünler erken oyunda görünmez.

## Aktif iç mekân ailesi — Brysia Pixel Cartoon Rooms

- Kaynak: https://brysiaa.itch.io/pixel-cartoon-rooms
- Yazar: Brysia
- Fiyat: ücretsiz / name-your-own-price
- Stil: 16x16 tabanlı, renkli 2D pixel art, rooms / side-scroller
- Lisans notu: kişisel ve ticari projelerde kullanım ve düzenleme serbest; asset dosyaları yeniden satılamaz veya bağımsız olarak dağıtılamaz; kredi zorunlu değil
- İçerik: duvar, zemin, pencere, kapı, sandalye, masa, çekmece, komodin, kitaplık, masa, yatak, koltuk, sehpa, raf, lamba, bitki, tablo, TV, perde ve küçük dekorlar
- KELEPİR rolü: başlangıç odası ve erken dönem küçük ev iç mekânlarının ana görsel referansı
- İlk kullanım: `data/pixelAssets.ts` içindeki hazır room preview / fallback sahneleri

Bu paket, karşıdan okunabilen oda kompozisyonu nedeniyle eski izometrik Furniture Kit kullanımının yerini alır.

## Aktif şehir / dış mekân ailesi — GrafxKid City Mega Pack

- Kaynak: https://opengameart.org/content/city-mega-pack
- Yazar: GrafxKid
- Lisans: CC0
- Stil: 2D pixel art, side-scroller şehir
- İçerik: vatandaşlar, mobilya, yiyecekler, şehir binaları, dükkân içleri, sokak objeleri, yollar ve arka planlar
- KELEPİR rolü: Kavşak / Eskiyaka sokakları, Bit Pazarı çevresi, dükkân cepheleri, ana menü ve genel şehir dili
- Dosya: https://opengameart.org/sites/default/files/CITY_MEGA.png

Ana dış dünya pixel ailesi olarak değerlendirilir. Pazar ve sokak yeniden kurulurken eski 3D/isometrik şehir renderlarının yerine geçecektir.

## Aktif elektronik ürün ailesi — Airos 32px Electronics

- Kaynak: https://opengameart.org/content/32px-electronics
- Yazar: Airos
- Lisans: CC0
- Stil: 32x32 pixel art
- İçerik: boombox / radyo, el telsizi, laptop, kameralar, handheld cihazlar ve küçük elektronikler
- KELEPİR rolü: 2002 dönemine uyan küçük elektronik ürün sprite'ları ve ilk Raksen için geçici pixel temsil
- Kullanılan sheet: https://opengameart.org/sites/default/files/misc_electronics_sheet_0.png

Model-spesifik ürünlerde ürün adı ile görselin dönemi ve formu ayrıca doğrulanır. Aynı sprite farklı ürün adlarıyla gelişigüzel tekrar kullanılmaz.

## Ücretsiz tamamlayıcı aday — GandalfHardcore Modern City 32x32

- Kaynak: https://gandalfhardcore.itch.io/free-pixel-art-sidescroller-asset-pack-32x32-city
- Fiyat: ücretsiz / name-your-own-price
- Stil: modern side-scroller pixel art
- Lisans notu: kişisel ve ticari projelerde kullanım ve düzenleme serbest; yeniden satış / paketleme yasak
- İçerik: zemin, asfalt, bina cepheleri, pencere, kapı, shop tile, trafik ışığı, tabela ve şehir arka planları
- KELEPİR rolü: City Mega Pack'in karşılamadığı dış mekân parçalarında ancak stil uyumu korunursa tamamlayıcı

## Ücretsiz tamamlayıcı aday — OdiStudio Pixel Art Bedroom

- Kaynak: https://odistudio-games.itch.io/pixel-art-room-asset-pack
- Lisans: CC BY 4.0
- Fiyat: ücretsiz / name-your-own-price
- Stil: detaylı 2D pixel art bedroom
- İçerik: hazır yatak odası sahnesi, yatak, masa, sandalye, bilgisayar, raf, koltuk, saat, poster ve diğer oda parçaları
- KELEPİR rolü: Brysia paketinde ihtiyaç karşılanmazsa ikinci iç mekân kaynağı

## Eski / emekliye ayrılan ana aileler

### Kenney Furniture Kit

- Kaynak: https://kenney.nl/assets/furniture-kit
- Lisans: CC0
- Durum: **ana oyun sahnelerinde emekli**
- Sebep: hazır PNG'ler izometrik olduğu için yeni karşıdan 2D pixel art yönüyle uyuşmuyor.
- Not: yalnızca geliştirme araçlarında veya görünmeyen prototiplerde kalabilir.

### Kenney Retro Urban Kit

- Kaynak: https://kenney.nl/assets/retro-urban-kit
- Lisans: CC0
- Durum: **ana şehir görsel ailesi olmaktan çıkarıldı**
- Sebep: perspektif ve render dili yeni front-facing pixel art hedefiyle uyuşmuyor.

### Kenney Character Pack

- Lisans: CC0
- Durum: büyük müşteri / satıcı sunumunda kullanılmayacak.
- Sebep: önceki Serkan ekranında karakterler diğer sahne assetlerinden kopuk ve prototip hissinde görünüyordu.

### Kenney UI Pack 2.0

- Lisans: CC0
- Durum: ihtiyaç halinde ikon kaynağı olarak kalabilir; ana oyuncu UI'ı yeni pixel art stile uyarlanacaktır.

## Diğer doğrulanmış kaynaklar

### OpenGameArt Retro Items

- Kaynak: https://opengameart.org/content/retro-items
- Lisans: CC0
- İçerik: kamera, kaset / kasetçalar, telefon, radyo, VCR / VHS, kulaklık, saat vb.
- Kullanım: pixel stil ve dönem uyumu doğrulandığında ikinci el ürün havuzu

### 3dmodelscc0 Electronics & Gadgets

- Kaynak: https://3dmodelscc0.itch.io/free-cc0-electronics-gadgets-pack
- Lisans: CC0
- Durum: yeni ana stil 2D pixel olduğu için yalnızca son çare kaynak; doğrudan 3D render ana sahneye konmaz.

### PSX Retro Props Pack

- Kaynak: https://lewie.itch.io/psx-retro-props-pack
- Lisans: CC0
- Durum: yeni ana stil nedeniyle doğrudan görünür sahne asseti olarak kullanılmaz.

## Dönem ve konsept kontrolü

Bir asset ücretsiz ve lisanslı olsa bile 2002 başlangıç yılına uymuyorsa kullanılmaz. Telefon, otomobil, bilgisayar, televizyon, konsol, tabela, mobilya ve mağaza aksesuarları oyun zamanına göre açılır.

## Uygulama kuralı

Yeni ekran yapılırken önce bu dosyadaki **aktif** ailelere bakılır. Eksik parça varsa side-view / front-facing pixel art içinde yeni ücretsiz kaynak aranır ve oyuna girmeden önce buraya kaynak ve lisans notu eklenir. Uygun asset bulunamadığı için izometrik veya rastgele paket kullanmak kabul edilmez.
