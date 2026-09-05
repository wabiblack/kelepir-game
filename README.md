# KELEPİR

2002 yılında Kavşak şehrinin Eskiyaka mahallesinde **0 ₺** ile başlayan açık uçlu web tabanlı ikinci el ticaret oyunu.

## Oyun yapısı

Başlangıçtaki Raksen RX-40 akışı kısa bir tutorial görevi görür. İlk satıştan sonra oyun serbest moda açılır; oyuncu hangi ürünü alıp satacağına kendisi karar verir.

## Şu an oynanabilen başlangıç akışı

- 2002 başlangıç ekranı
- Eskiyaka'daki oda
- Odayı tıklayarak araştırma
- İlk eşya: Raksen RX-40 kasetçalar
- Ürünü inceleme ve temizleme
- Evdekilerden satış izni alma
- Cumartesi Pazarı'na gitme
- İlk müşteriyle gerçek pazarlık
- Teklif kabul etme, karşı teklif verme veya satıştan vazgeçme
- Müşteri sabrı ve değişken replikler
- Satış yapılırsa ilk sermayenin cüzdana eklenmesi

> Raksen henüz pil ile test edilmeden pazara götürülebilir. Çalışma durumunun belirsiz olması alıcının teklifini aşağı çeker. Bu, ilerideki teşhis/test sisteminin ilk ekonomik etkisidir.

## Serbest pazar prototipi

İlk satıştan sonra **Bit Pazarı** açılır.

- Rastgele pazar fırsatları
- Farklı satıcılar, durumlar ve gizli riskler
- Ürünü satın almadan önce inceleme
- Tahmini piyasa aralığı
- Satıcı minimum fiyatı ve sabrı
- İstenen fiyat, %10 düşük teklif veya %20 düşük teklif
- Teklif fazla düşükse satıcının vazgeçmesi
- Satın alınan ürünlerin envantere girmesi
- Envanterde alıcı arama
- Teklifi kabul etme veya reddetme
- Alış/satış kayıtları
- Gerçekleşen net kâr/zarar hesabı
- Envanter ve kasa defterinin tarayıcıda kalıcı tutulması

Ekonomi mantığı ürün görsellerinden bağımsızdır. Hazır asset doğrulanmadan bir ürün adına yanlış görsel bağlanmaz.

## Asset sistemi

- Kenney Generic Items: küçük eşya ve envanter havuzu
- Kenney Character Pack: modüler müşteri/NPC üretimi
- Kenney Character Pack Facial Hair: sakal/bıyık varyasyonları
- Kenney UI Pack 2.0: oyun butonları ve temel arayüz parçaları
- Asset Lab: `/art-lab`
- NPC Lab: `/art-lab/customers`

Görsel kuralı: **sıfırdan çizim yerine lisansı temiz hazır asset bulmak**. Uygun 2D asset yoksa CC0 3D model bulunup sabit kamera/ışık ile 2D oyun görseline dönüştürülür.

## Teknoloji

- Next.js
- React
- TypeScript
- Tailwind CSS

## Geliştirme

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

## Otomatik doğrulama

`main` dalına her push sonrası GitHub Actions üzerinde bağımlılıklar kurulup `npm run build` çalıştırılır.

## Sonraki ana hedef

Serbest pazar ürünlerine doğrulanmış hazır assetleri bağlamak; ardından temizlik, test, tamir masrafı ve farklı satış kanallarını aynı ekonomi döngüsüne eklemek.
