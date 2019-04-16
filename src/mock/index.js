import Mock from 'mockjs';

export default {
    bootstrap() {
        Mock.mock("/api/getData", function(ops) {
            window.console.log(ops);
            return Mock.mock({
                'list|10': [{
                    'id|+1': 1,
                    'name': '@cname',
                    'region': '@region',
                    'province': '@province',
                    'city': '@city',
                    'cdate': '@datetime("yyyy-MM-dd HH:mm:ss")'
                }],
                'count|11-49': 1
            })
        });
    }
};