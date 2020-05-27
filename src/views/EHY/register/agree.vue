<template>
  <div class="agree">
    <h1>APP用户隐私协议</h1>
    <h3>告知用户</h3>
    重视每个用户的的隐私，郑重承诺如下：
    <h3>一、我们所收集的信息以及如何使用：</h3>
    <div class="p1">
      我们可能通过您的IP地址，地理位置信息，收集一些非个人隐私的统计资料，使我们能够进一步改善APP的服务。例如，当您浏览一个网页时，此网址、当时的时间、您所使用的浏览器性质、给您提供接入服务的ISP等，可能都会被自动记录下来。
    </div>
    <p>(1) COOKIE</p>
    <div class="p2">
      Cookie 是指从网络服务器发送到您的浏览器，并储存到电脑硬盘上的少量数据，通常包括一些特殊标识符，是用来记录您的使用者 ID。
      您以根据自己的喜好，设定接收所有 cookies，拒收所有 cookies ，或在设定 cookie 时得到通知。然而您必须在开启您的cookies时才能使用APP所提供的服务。
    </div>
    <p> (2) 查询时输入的身份证号码和姓名</p>
    <div class="p3">服务器存储时我们会对身份证和姓名做MD5的加密处理。</div>
    <p> (3) 注册时填写的邮箱</p>
    <div class="p3">不传播，不开放，不泄露。</div>
    <h3> 二、信息公开与共享</h3>
   <div class="p3"> APP不会将您的个人资料提供给任何人。但以下情况除外：</div>
    <p> (1) 已获得用户的明确授权；</p>
    <p> (2) 根据有关法律法规的要求或按照法院或相关政府部门的要求；</p>
    <p>(3) 为维护APP的合法权益；</p>
    <p>(4) 为维护APP的用户和社会公众的合法权益；</p>
    <p>(5) APP认为有必要的其他情况。</p>
    <h3> 三、信息的更新和删除</h3>
   <div class="p2"> 在您的个人资料有变动的情况下，您可以更新和修改您的个人资料已使其有效。您在任何时候都能非常容易地使用您的注册名与密码登录本网站以修改或删除您的个人资料及档案。</div>
    <h3>四、保护您的隐私</h3>
    <div class="p2">我们将采取严格的措施保护您的隐私，确保您的隐私权不受任何侵犯。只要您提供给我们任何个人信息，我们都会采取有效的手段保护您的信息（法律或政府的强制性规定不在此限）。</div>
    <h3> 五、更新隐私条款</h3>
    <div class="p2">我们可能会对APP的隐私权政策进行修改，如果在使用用户个人信息政策方面有大幅度修改时，我们会通过电子邮件通知您。</div>
  </div>
</template>

<script>
  export default {
    name: 'agree'
  }
</script>

<style scoped lang="scss">
  .agree {
    width: 660px;
    height: 900px;
    overflow: auto;
    letter-spacing: 4px;

    h1, h3, p {
      margin: 20px 0;
      font-size: 30px;
    }

    h1 {
      text-align: center;
    }

    .p1 {
      line-height: 35px;
      font-size: 28px;
    }

    .p2 {
      line-height: 40px;
      font-size: 28px;
    }
    .p3 {
      line-height: 28px;
      font-size: 28px;
    }
  }
</style>
