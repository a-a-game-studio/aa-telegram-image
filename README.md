# aa-telegram-image
telegram image store


## faSendImgByUrl
``` typescript
    const aATelegramImageSys = new AATelegramImageSys.AATelegramImageSys(bot.token, null, null);
    let img = `http://likechoco.ru/img/gork-pl-1_b.jpg`;
    let data = await aATelegramImageSys.faSendImgByUrl(bot.chat_id, img, 'Привет');
    console.log(data);
    
```

``` JSON
{
  message_id: 5,
  chat: { id: -1001278713118, title: 'LikeChocoImg', type: 'channel' },
  date: 1587200116,
  photo: [
    {
      file_id: 'AgACAgQAAx0ETDedHgADBV6awHT0wg6oHTsjIYscqNtLIewLAALvqjEbnP_cUPOr_wtDOyM9pLjMIl0AAwEAAwIAA20AA0_uAAIYBA',
      file_unique_id: 'AQADpLjMIl0AA0_uAAI',
      file_size: 31410,
      width: 320,
      height: 320
    },
    {
      file_id: 'AgACAgQAAx0ETDedHgADBV6awHT0wg6oHTsjIYscqNtLIewLAALvqjEbnP_cUPOr_wtDOyM9pLjMIl0AAwEAAwIAA3gAA1DuAAIYBA',
      file_unique_id: 'AQADpLjMIl0AA1DuAAI',
      file_size: 140786,
      width: 800,
      height: 800
    },
    {
      file_id: 'AgACAgQAAx0ETDedHgADBV6awHT0wg6oHTsjIYscqNtLIewLAALvqjEbnP_cUPOr_wtDOyM9pLjMIl0AAwEAAwIAA3kAA1HuAAIYBA',
      file_unique_id: 'AQADpLjMIl0AA1HuAAI',
      file_size: 207904,
      width: 1024,
      height: 1024
    }
  ],
  caption: 'Привет'
}
```