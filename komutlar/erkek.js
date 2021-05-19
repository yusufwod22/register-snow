const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
let kayityetkili = '841085521555357734' //Yetkili
let rolver1 = '841085521555357726' //Verilecek
let rolver2 = '842516953976799232' //Verilecek2
let rolal = '841085521525604393' //Alınacak
let isimön = '❆' //İsmin önüne gelecek simge,tag 

  if(!message.member.roles.cache.has(kayityetkili))  
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2] 
  if (!member) return message.channel.send('Bir üye etiketlemelisin.')
  if (!isim) return message.channel.send('Bir isim yazmalısın.')
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.') 
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.')
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)
  let toplamaisim = `${isimön} ${isim} ${yaş}` 

  setTimeout(function(){
  member.setNickname(`${isimön} ${isim} | ${yaş}`)
  },1000)
    setTimeout(function(){
  member.roles.add(rolver1)
  },2000)
  setTimeout(function(){
    member.roles.add(rolver2)
    },2000)
  setTimeout(function(){
  member.roles.remove(rolal)
  },3000)

let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) || '0'
const emoji = client.emojis.cache.find(emoji => emoji.name === "5_");

  if(kayıtlımı !== 'evet') {
  db.add(`kayıte_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}` , 1) 
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)  
  let embed = new Discord.MessageEmbed()
  .setColor('#00ffe3')
  .setDescription(`
  ${member} kişisinden <@&${rolal}> rolü alınıp 

  <@&${rolver1}> & <@&${rolver2}> rolü verildi.

  **Kaydın Başarılı Bir Şekilde Yapıldı İyi Eğlenceler.**
`)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('Erdem Çakıroğlu 💙 Registery')
message.channel.send(embed)
  }  
  if(kayıtlımı === 'evet') {
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setColor('#00ffe3')
  .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş!** \`${eskiismi}\``)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('Snow 💙 Registery')  
message.channel.send(embed)
  }
}; 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek","man"],
  permLevel: 0
}
exports.help = {
  name: 'e',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}
