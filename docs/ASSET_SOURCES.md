# KELEPİR Asset Kaynakları

Bu dosya projeye giren üçüncü taraf asset paketlerinin kaynağını ve lisansını takip eder.

## Görsel üretim kuralı

KELEPİR için yeni item/NPC/araç/UI görseli sıfırdan çizilmez. Önce lisansı temiz hazır asset aranır. Gerektiğinde hazır 3D model sabit kamera, ışık ve render ayarıyla 2D oyun görseline dönüştürülür. Böylece yüzlerce ürün aynı perspektif ve ışık dilinde üretilebilir.

Bir asset oyuna alınmadan önce kaynak, lisans ve görsel eşleşme doğrulanır. Sadece dosya adına bakıp bir ürün adı uydurulmaz.

## Kenney — Generic Items

- Resmi kaynak: https://kenney.nl/assets/generic-items
- Lisans: Creative Commons CC0 1.0
- Paket türü: 2D item / tools / household / tech
- KELEPİR kullanımı: erken oyun envanter ikonları, küçük eşya adayları ve geliştirme prototipleri
- Repo içindeki tarayıcı: `/art-lab`

Geliştirme ortamında görseller, `eturner58/game-assets` adlı açık Kenney aynasından sabit bir commit SHA üzerinden çağrılır. Böylece paketin içeriği sonradan değişse bile KELEPİR'in kullandığı sürüm sabit kalır.

## Kenney — Character Pack

- Lisans: Creative Commons CC0 1.0
- Kullanım: müşteri, satıcı ve mahalle NPC'leri
- Modüler yüz, saç, ten ve kıyafet parçaları kullanılır.

## Kenney — UI Pack 2.0

- Lisans: Creative Commons CC0 1.0
- Kullanım: buton, ok, checkbox, slider ve durum ikonları
- Ana palet: Green + Grey, riskli aksiyonlarda Red

## Aday kaynak — 3dmodelscc0 Electronics & Gadgets

- Kaynak: https://3dmodelscc0.itch.io/free-cc0-electronics-gadgets-pack
- Lisans: CC0
- İçerik: console, digital camera, flashlight, microphone, radio, router, security camera, USB stick, VR goggles, radiophone
- Planlanan kullanım: model-spesifik veya büyük ürün kartları için sabit kamera 2D render kaynağı

## Aday kaynak — Retro Office Pack

- Kaynak: https://retroblockstudio.itch.io/retro-office-pack
- Lisans: CC0
- İçerik: retro PC, vintage TV, old radio, retro phone, desk, chair, flashlight ve dekor objeleri
- Planlanan kullanım: 1990'lar / 2000'lerin başı elektronik ve oda/işyeri prop'ları

## Aday kaynak — OpenGameArt Retro Items

- Kaynak: https://opengameart.org/content/retro-items
- Lisans: CC0
- İçerik: kamera, kaset/kasetçalar, telefon, radyo, VCR/VHS, kulaklık, saat ve benzeri retro item'lar
- Not: pixel art olduğu için ana görsel diline uymadığı ekranlarda kullanılmaz; yalnızca stil uyumu sağlanırsa değerlendirilir.

## Aday kaynak — CC0Tree

- Kaynak: https://github.com/SkywolfGameStudios/CC0Tree
- Lisans: CC0
- İçerik: büyüyen düşük poligon 3D prop ve çevre asset kütüphanesi
- Planlanan kullanım: ileride dükkân, depo, sokak, tamir alanı ve büyük prop havuzu

## Sanat politikası

Hazır asset bulunamadığında sıfırdan çizime dönülmez. Arama alanı genişletilir veya uygun bir CC0 3D model bulunup KELEPİR'in sabit render şablonuyla 2D'ye çevrilir. Model-spesifik telefon, konsol, otomobil ve koleksiyonluk ürünlerde de aynı yaklaşım geçerlidir.
