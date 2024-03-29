# Проект: «Stellar-burgers»

## Краткое описание: 
Данный проект представляет собой онлайн сервис для заказов космических бургеров. 
### Доступные разделы:
#### Конструктор 
В конструкторе возможно просмотреть доступные ингредиенты для заказа. При клики по ингредиенту узнать подробную информацию об ингредиенте (открывается модальное окно).
А также оформить заказ, переместив выбранную вами булочку и другие ингредиенты в специальное поле. В случае, если пользователь не был авторизован, то он будет перенаправлен на страницу для входа в свой аккаунт. После успешной авторизации, пользователь будет возвращен в "Конструктор", где сможет оформить заказ снова(добавленные ранее ингредиенты не будут потеряны). При успешном оформлении, пользователь получит номер заказа.

#### Лента заказов 
Лента заказов предоставляет пользователю возможность узнать какое количество заказов было выполнено за всё время и за сегодня. А также узнать более подробную информацию о заказах выполненных сегодня. При клике на заказ открывается модальное окно отображающие номер заказа, статус, состав, цену и время когда заказ был выполнен. Заказы отображаются в режиме реального времени (реализовано с использованием websocket).

#### Личный кабинет
Личный кабинет содержит в себе 2 подраздела - профиль, история заказов. А также возможность выйти с аккаунта.
* В профиле имеется возможность изменить своё имя и логин.
* В истории заказов можно просмотреть заказы, которые были совершены пользователем.

### Авторизация:
* Неавторизованный пользователь не может попасть во вкладку "Профиль" и "оформить заказ".
* Авторизованный пользователь не может попасть на страницу входа, регистрации и сброса пароля.
* При регистрации пользователю присваивается refreshToken, а также accessToken (срок жизни которого 20 минут). RefreshToken используется для выхода из системы и для получения нового accessToken, если у последнего истёк срок и он перестал подходить.
* В случае, если пользователь забыл пароль, то он может воспользоваться разделом "Восстановить пароль". После успешного восстановления на почту пользователя приходит инструкция с кодом для восстановления пароля.

### Технологии:
* Typescript: ^4.6.2
* React: ^16.8.6
* React-redux: 7.2.8
* React-dnd: ^15.1.2
* React-router-dom: ^6.3.0
* Fetch api, webSocket

### Инструкция по развёртыванию:
1. Клонировать 
2. Установить зависимости
3. Ввести в терминале команду - npm start

#### Демонстрация оформления заказа:
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/71271134/198257080-6099a0bb-993b-4b77-a741-6a16e4d0710d.gif)
