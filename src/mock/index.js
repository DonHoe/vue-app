import Mock from 'mockjs';

export default {
  bootstrap() {
    Mock.mock("/api/getData",{
        'list|1-10': [{
            'id|+1': 1
        }]
    });
  }
};
