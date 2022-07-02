#language:ru
#noinspection NonAsciiCharacters

Функционал: Создание нового заведения
  Пользоватлею было бы удобно создавать свое заведение

  @create-new-place
  Сценарий: Создание нового заведения
    Допустим  я нахожусь на странице "Логин"
    Если я ввожу в поля формы:
      | Email    | grogu@gmail.com |
      | Password | 123             |
    И нажимаю на кнопку формы "SIGN IN"
    То я должен увидеть текст "Login successful"
    Допустим я кликаю на текст "Add Place"
    То я должен увидеть текст "By sumbitting this form"
    Допустим я ввожу в поля формы:
      | Title       | NAVAT             |
      | Description | really good place |
    Допустим я выбираю файл кота
    Допустим я жду "5" секунд
    Допустим нажимаю на кнопку формы "CREATE"
    То я должен увидеть текст "NAVAT"



