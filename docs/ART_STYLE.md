# KELEPİR Görsel Stil Kılavuzu

## 1. Ana yön

KELEPİR gerçekçi fotoğraf kullanmaz. Görsel dil:

- 2D vektör / SVG tabanlı
- yarı gerçekçi, stilize
- sıcak ve hafif kirli dönem atmosferi
- nesneler siluetinden tanınabilir
- mobil ve masaüstünde net

Amaç, eşyanın marka/model farkını oyuncuya metni okumadan hissettirmektir.

## 2. Perspektif

- Mekânlar: hafif perspektifli yandan / 3-çeyrek görünüm
- Ürün inceleme: önden veya ürünün en karakteristik 3-çeyrek açısı
- Araçlar: çoğunlukla ön-yan 3-çeyrek
- Envanter ikonları: sade, mümkünse tek açı

## 3. Dönem paleti

### 2002-2007
- sıcak kahve
- soluk bej
- koyu yeşil
- kirli krem
- mat plastik / metal

### 2008-2015
- kontrast biraz artar
- teknoloji ürünlerinde daha temiz yüzeyler
- mavi/gri tonlar çoğalır

### 2016+
- daha soğuk ve temiz arayüz
- ürünlerde cam, parlak metal ve keskin ışıklar artar

Dünya yıllar ilerledikçe görsel olarak da modernleşir.

## 4. Ürün kuralı

Her model önce siluet testinden geçer.

Örnek:
- iPhone 4: kalın metal çerçeve, home tuşu, küçük ekran
- modern telefon: ince çerçeve, büyük kamera adası, farklı ekran oranı
- CRT TV: kalın gövde, bombeli ekran
- modern TV: ince panel

İki farklı model sadece renk değişimiyle temsil edilmez.

## 5. Durum katmanları

Her ürün mümkün olduğunda aynı ana asset üzerinden durum varyasyonlarına ayrılır:

1. clean
2. dirty
3. scratched
4. cracked
5. missing-part
6. repaired
7. collector

Kir, çizik ve çatlaklar ürünün karakteristik detaylarını tamamen kapatmamalıdır.

## 6. Animasyon

Mikro animasyonlar 0.25-1.2 saniye aralığında tutulur.

- ürün bulma: kısa yükselme / fade
- temizleme: parlaklık geçişi + asset değişimi
- test: düğme hareketi / ekran veya LED tepkisi
- satın alma: ürünün envantere kayması
- satış: ürünün sahneden çıkması + para geri bildirimi

Uzun sinematik animasyonlardan kaçınılır.

## 7. Dosya sistemi

```text
public/assets/
  rooms/
    eskiyaka/
  items/
    cassette/
      raksen-rx40/
        clean.svg
        dirty.svg
  ui/
  effects/
```

İsimler küçük harf ve tire ile yazılır.

## 8. İlk referans assetler

- `rooms/eskiyaka/room_2002.svg`
- `items/cassette/raksen-rx40/dirty.svg`
- `items/cassette/raksen-rx40/clean.svg`

Bu üç dosya KELEPİR'in ilk görsel kalite çıtasıdır. Sonraki assetler bunlarla aynı dünyaya ait görünmelidir.
