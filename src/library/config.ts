// Local 
export enum LocalConfig{
    PORT = 3000
}
export enum statusMessages {
    InputTypesError = 'Type Hatası',
    ExistingValueType = 'Böyle bir blog mevcut',
    RegisterFailedToBlogs = 'Kayit Başarisiz',
    SuccesBlogRegister = 'Kayit Başarili',
    BlogNotFind='Blog Bulunamadi',
    BlogDelete = 'Blog Silindi',
    BlogNotFindAndDelete = 'Blog Bulunamadi veya Silinemedi',
    ValueTypeEmpty = 'Değerler boş',
    BlogNotFiend = 'Blog Bulunamadi',
    ValuesNotChanged = 'Değerler değiştirilemedi',
    ValuesChangedSuccess = 'Değerler güncellendi',
    //
    InvalidValues = 'Lütfen bilgileri doğru giriniz.',
    RegisterCurrentValue = 'Bu bilgi zaten kayitli',
    RegisterFailed = 'Kayit Başarisiz.',
    UserSuccessRegister = 'Kayit Başarili',
    UserNotFound = 'Kullanici Bulunamadi , lütfen kaydolun.',
    HashNotDecoded = 'Hash Kodu Donuşturulemedi',
    UserLoginSuccess = 'Giriş Başarili'
}
export enum statusCode {
    TypeWrong = 404,
    ExistingValue = 302,
    RegisterFailedtoBlog = 201,
    SuccesProcces = 200,
    BlogNotFiend = 301,
    NotChanged = 404,
    MemberRegisterFailed = 404,
    CurrentValue = 201,
    RegisterSuccess = 200

}
