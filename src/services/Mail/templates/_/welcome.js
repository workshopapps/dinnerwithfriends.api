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
            Welcome to {{ platform.name }}!
        </td>
    </tr>
    </tbody>
</table>
</body>
`;
