<?php

namespace App\Controller;

use App\Form\ChangePasswordType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AccountPasswordController extends AbstractController
{
    /**
     * @Route("/compte/edit-password", name="app_edit_password")
     */
    public function index(Request $request, UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $entityManager): Response
    {

        $notif = null;

        $user = $this->getUser();

        $form = $this->createForm(ChangePasswordType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $old_password = $form->get('old_password')->getData();

            if ($passwordEncoder->isPasswordValid($user, $old_password)) {

                $new_password = $form->get('new_password')->getData();
                //dd($new_password);
                $password = $passwordEncoder->hashPassword($user, $new_password);

                $user->setPassword($password);

                $entityManager->flush();

                $notif = "Votre mot de passe a bien été à jour !";
            } else {
                $notif = "Le mot de passe actuel n'est pas le bon !";
            }
        }

        return $this->render('account/password.html.twig', [
            'form' => $form->createView(),
            'notification' => $notif
        ]);
    }
}