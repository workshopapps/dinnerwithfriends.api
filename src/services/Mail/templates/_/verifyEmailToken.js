module.exports = `
<body style=" display: block; background: #F7F7FA;">
<table width="100%" style="background: #fff; max-width: 640px; margin: auto; border-top: 5px solid #2FB47C; padding: 48px;">
    <thead>
    <tr>
        <td style="padding-bottom: 56px;">
            <img src="{{ platform.logo }}" alt="[LOGO]" style="height: 40px"/>
        </td>
    </tr>
    <tr>
        <td style="padding-bottom: 24px; font-size: 28px; color: #374072; font-weight: bold;">
            Email Verification!
        </td>
    </tr>
    <tr>
        <td style="padding-top: 24px; padding-bottom: 24px; font-size: 20px; color: #374072; font-weight: bold;">
            Please verify your email address
        </td>
    </tr>
    </thead>

    <tbody>
    <tr>
        <td style="font-weight: bold; font-size: 24px; color: #2FB47C; background-color: #F2F2F2; padding: 13px; display: flex; align-items: center; justify-content: center;">
            {{ code }}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 24px; font-size: 18px; color: #646A86;">
            <p>
                We are reaching you because this email has been used to create an account on {{ platform.name }}.
                Kindly use the code above to verify your email address.
            </p>
            <p>
                It will expire in 30 minutes:
            </p>
        </td>
    </tr>
    </tbody>
</table>
</body>

`;