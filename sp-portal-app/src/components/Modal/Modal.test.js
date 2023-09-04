import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

test('Should render sidebar, input phone and cards', () => {
    render(
    <Modal
        confirmButtonText='Cerrar Sesión'
        deniedButtonText='Volver'
        onConfirmClick={() => window.parent.location.replace(`${PSP_URL}/logout`)}
        onDeniedClick={() => setShowSidebarModal(false)}
        icon='iconTest'
        message='¿Confirmar cierre de sesión?'
    />
    );

    const confirmButtonTextTest = screen.getByText("Cerrar Sesión");
    expect(confirmButtonTextTest).toBeInTheDocument();

    const deniedButtonTextTest = screen.getByText("Volver");
    expect(deniedButtonTextTest).toBeInTheDocument();

    const messageTest = screen.getByText("¿Confirmar cierre de sesión?");
    expect(messageTest).toBeInTheDocument();
});
