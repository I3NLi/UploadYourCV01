import { MockConfig } from "vite-plugin-mock"

export default function (config: MockConfig) {
    return [
        {
            url: '/api/login',
            method: 'post',
            rawResponse: async (req, res) => {
                let body = ''
                await new Promise((resolve) => {
                    req.on('data', (chunk) => {
                        body += chunk
                    })
                    req.on('end', () => {
                        setTimeout(() => {
                            resolve(undefined)
                        }, 5000);
                    })
                })
                const { userName, password } = JSON.parse(body)
                res.setHeader('Content-Type', 'application/json')
                if (userName === 'admin' && password === "Admin888_666") {
                    res.statusCode = 200
                    return res.end(JSON.stringify({
                        status: 200,
                        data: {
                            id: 1,
                            userName,
                        },
                        msg: ''
                    }))

                }

                res.statusCode = 401
                return res.end(JSON.stringify(
                    {
                        status: 401,
                        errmsg: '用户名或密码错误'
                    }
                ))

            },
        },
    ]
}